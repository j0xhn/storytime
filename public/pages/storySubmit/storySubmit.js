angular.module('directives')
.directive('storySubmit', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: function($scope, storiesService, userService){
      $scope.story = {};
      $scope.story.inputs = [];
      //  For WYSIWY
      $scope.story.html= 'Write your story here.  Include your interactive keywords with square brackets like such: [keyword]';
      $scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      };
      //  End WYSIWY

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
          console.log(res.data);
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
