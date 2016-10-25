angular.module('directives')
.directive('storySubmit', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, storiesService, inputService, userService, $routeParams, $q, analyticService, $location){
      //  For WYSIWY
      $scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        image_dimensions: false
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
              if(!userService.user._id === story.authorId){ $scope.pageErrorMessage = 'You do not have permission to edit this story.  Please try logging in under the account that authored this story.' }
              resolve(story);
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
        story.html = inputService.bindTextKeywords(story.html, false);
        story.html = inputService.bindToggleKeywords(story.html, false);
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
          let index = 0;
          for (var k in inputs){
            // TEMPORARY - get legacy up to date
            // for re-ordering legacy stories
            if (!inputs[k].index) { inputs[k].index = index; index++; }
            // for adding type of input
            if (!inputs[k].type){ inputs[k].type = 'text'}
            // end of temporary

            let input = inputs[k];
            // if changed / updated
            if (input.keyword != k){ inputs[input.keyword] = input; delete inputs[k]; }
            // if empty
            if (!input.keyword){ delete inputs[k] }
            // if added new
            if (inputs.hasOwnProperty(k) && input.hasOwnProperty('temporary') ) {
              delete input.temporary;
              inputs[input.keyword] = input;
              delete inputs[k];
            }
          }

          story.html = inputService.bindTextKeywords(story.html, true);
          story.html = inputService.bindToggleKeywords(story.html, true);
        }

        story.authorName = userService.isLoggedIn() ? 'Guest Author' : userService.user.profile.name;
        story.authorId = userService.user._id;

        storiesService.postStory(story).then(function(res){
          if(!res.data || res.data.error){
            $scope.globalErrorMessage = res.data.error || 'An error occured.  If problems continue contact support';
            console.error(res || 'error occured');
            analyticService.error('Post Story', 'storySubmit.js')
          } else {
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
