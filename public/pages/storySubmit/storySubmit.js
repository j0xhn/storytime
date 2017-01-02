angular.module('directives')
.directive('storySubmit', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, storiesService, inputService, userService, $routeParams, $q, analyticService, $location){
      //  For WYSIWY
      $scope.tinymceOptions = {
        plugins: ['link image code','paste'],
        paste_as_text: true,
        keep_styles: false,
        invalid_elements: "p",
        forced_root_block : '',
        force_p_newlines : false,
        force_br_newlines : true,
        convert_newlines_to_brs : true,
        entity_encoding: 'raw',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        image_dimensions: false
      };

      $scope.handleSuccess = function(id){
        $location.path('/success/save-story').search({d:id || $routeParams.storyId});
      };

      const storyPromise = $q(function(resolve, reject){
        if($routeParams.storyId === 'example'){
          $scope.exampleStory = true;
          resolve(storiesService.exampleStory)
        } else if ($routeParams.storyId) {
          // handle empty response, mis-match ids, and success
          storiesService.searchStories({_id:$routeParams.storyId}).then(function(res){
            if(res.data){
              const story = res.data;
              if(!userService.user._id === story.authorId && !userService.isAdmin()){
                $scope.pageErrorMessage = 'You do not have permission to edit this story.  Please try logging in under the account that authored this story.'
              } else {
                resolve(story);
              }
            } else {
              $scope.pageErrorMessage = `Story not found.  Check the id in the URL and contact support if you continue to have problems`;
            }
          })
        } else {
          // default values
          resolve({
            inputs: {},
            html: 'Write your story here.  Include your interactive keywords with curly brackets like such: {keyword}'
          })
        }
      }).then(function(story) {
        // defaults and altering
        story.html = inputService.bindTextKeywords(story.html, false);
        story.html = inputService.bindToggleKeywords(story.html, false);
        story.inputs = story.inputs || {};
        $scope.story = story;
      })

      $scope.submitStory = function(story){
        story = story || $scope.story;
        if(story.tags && !(typeof(story.tags) === 'object')){
          var tagArray = story.tags.split(/[,]+/).filter(Boolean);
          story.tags = tagArray.map(function(x){ return x.trim(); })
        }


        let inputs = story.inputs || {};
        if(Object.keys(inputs).length){
          story.inputs = inputService.cleanInputs(story.inputs);
          story.html = inputService.bindTextKeywords(story.html, true);
          story.html = inputService.bindToggleKeywords(story.html, true);
        }

        // set default values on submit
        story.authorName = userService.isLoggedIn() ? 'Guest Author' : userService.user.profile.name;
        story.authorId = story.authorId || userService.user._id;
        story.authorImageUrl = story.authorImageUrl || userService.user.profile.picture;
        story.price = story.price || 0;

        storiesService.postStory(story).then(function(res){
          if(!res.data || res.data.error){
            $scope.globalErrorMessage = res.data.error || 'An error occured.  If problems continue contact support';
            analyticService.error('error posting story' , $scope.globalErrorMessage)
          } else {
            analyticService.event('Post Story', 'success posting story', res.data.savedStoryId )
            $scope.handleSuccess(res.data.savedStoryId);
          }
        });
      }

      $scope.add = function (type) {
        const length = Object.keys($scope.story.inputs).length;
        $scope.story.inputs[length] = {
          index: length,
          temporary: true,
          type: type
        };
      }
    },
    templateUrl: '/pages/storySubmit/storySubmit.html',
    scope: {}
  }
});
