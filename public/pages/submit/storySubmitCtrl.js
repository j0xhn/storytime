angular.module('controllers')
.controller('storySubmitCtrl', function($scope, storiesService) {
  $scope.story = {};

  $scope.story.inputs = [];
  //  For WYSIWY
  $scope.story.html= 'Write your story here. :)';

  $scope.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
  //  End WYSIWY

  $scope.submitStory = function(story){
    debugger;
    // storiesService.postStory({title: 'test'}).then(function(res){
    //   console.log(res)
    // })
  }

  $scope.add = function () {
    $scope.story.inputs.push({
      inlineChecked: false,
      question: "",
      questionPlaceholder: "foo",
      text: ""
    });
  };
});
