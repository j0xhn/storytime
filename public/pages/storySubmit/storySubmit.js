angular.module('directives')
.directive('storySubmit', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, storiesService, userService, $routeParams, $q, analyticService, $location){
      //  For WYSIWY
      $scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        image_dimensions: false
      };

      $scope.exampleId = '57ee7ef2002a8c317ffe5c30';
      if ($routeParams.storyId == $scope.exampleId) $scope.exampleStory = true;

      $scope.handleSuccess = function(id){
        $location.path('/success/edit-story').search({d:id || $routeParams.storyId});
      }
      const storyPromise = $q(function(resolve, reject){
        if($routeParams.storyId){
          storiesService.searchStories({_id:$routeParams.storyId}).then(function(res){
            // handle empty response, mis-match ids, and success
            if(res.data){
              const story = res.data;
              if(!userService.user._id === story.authorId){
                $scope.pageErrorMessage = 'You do not have permission to edit this story.  Please try logging in under the account that authored this story.'
              }
              story.html = storiesService.bindKeywords(story.html, false);
              resolve(res.data);
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
          const objectToCombine = {};
          for (var k in inputs){
            let input = inputs[k];
            if (inputs.hasOwnProperty(k) && input.hasOwnProperty('temporary') ) {
              // if empty delete
              if (!input.keyword){
                delete inputs[k];
              } else{
                delete input.temporary;
                inputs[input.keyword] = input;
                delete inputs[k];
              }
            }
          }
          story.html = storiesService.bindKeywords(story.html, true)
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

      $scope.add = function () {
        const length = Object.keys($scope.story.inputs).length;
        $scope.story.inputs[length] = { temporary: true };
      }
    },
    templateUrl: '/pages/storySubmit/storySubmit.html',
    scope: {}
  }
});
