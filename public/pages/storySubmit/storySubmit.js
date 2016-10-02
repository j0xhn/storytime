angular.module('directives')
.directive('storySubmit', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, storiesService, userService, $routeParams, $q){
      //  For WYSIWY
      $scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        image_dimensions: false
      };
      const storyPromise = $q(function(resolve, reject){
        if($routeParams.storyId){
          storiesService.searchStories({_id:$routeParams.storyId}).then(function(res){
            // handle empty response
            if(res.data){
              // check to see if they have permission
              resolve(res.data);
            } else {
              $scope.pageErrorMessage = `Story not found.  Check the id in the URL and contact support if you continue to have problems`;
            }
          })
        } else {
          // default values
          resolve({
            inputs: [],
            html: 'Write your story here.  Include your interactive keywords with square brackets like such: [keyword]'
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

        if(story.inputs.length){
          var inputsObj = {}
          story.inputs.map(function(input){ inputsObj[input.keyword] = input})
          story.inputs = inputsObj;
          var newHtml = story.html.replace(/\[/g, '<b ng-bind="');
          story.html = newHtml.replace(/\]/g, '"></b>');
        }

        story.authorName = userService.user.type === 'guest' ? 'Guest Author' : userService.user.profile.name;
        story.authorId = userService.user._id;

        storiesService.postStory(story).then(function(res){
          if(res.data.success){
            // show success modal - on close take to their account page or home
            // generate edit URL
            //
          };

        })
      }

      $scope.add = function () {
        $scope.story.inputs.push({
          title: ""
        });
      }
    },
    templateUrl: '/pages/storySubmit/storySubmit.html',
    scope: {}
  }
});
