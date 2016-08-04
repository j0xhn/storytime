angular.module('controllers')
.controller('storySubmitCtrl', function($scope, storiesService) {
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
    var tagArray = story.tags.split(/[,]+/).filter(Boolean);
    story.tags = tagArray.map(function(x){ return x.trim(); })
    var newHtml = story.html.replace(/\[/g, '<b ng-bind="');
    story.html = newHtml.replace(/\]/g, '"></b>');

    storiesService.postStory(story).then(function(res){
      console.log(res)
    })
  }

  $scope.add = function () {
    $scope.story.inputs.push({
      title: ""
    });
  };
});
