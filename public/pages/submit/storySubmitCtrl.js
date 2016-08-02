angular.module('controllers')
.controller('storySubmitCtrl', function($scope, storiesService) {
  $scope.story = {};

  $scope.story.inputs = [];
  //  For WYSIWY
  $scope.story.html= 'Write your story here.  Include your interactive keywords with square brackets like such: [ keyword ]';

  $scope.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
  //  End WYSIWY

  $scope.submitStory = function(story){
    var sampleStory = '{"inputs":[{"title":"Enter Anything","$$hashKey":"object:26","keyword":"Sample"},{"title":"Same As Before","$$hashKey":"object:34","keyword":"Sample2"}],"html":"<p>minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. [ sample ], followed by [ sample2 ] should go there</p>","title":"Test 1","photoUrl":"www.testurl.com","price":"1","tags":"happy, sad, lonely,","shortDesc":"This is the best minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","longDesc":"Here is a really long desc Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}';
    var story = JSON.parse(sampleStory);
    var tagArray = story.tags.split(/[,]+/).filter(Boolean);
    story.tags = tagArray.map(function(x){ return x.trim(); })
    var newHtml = story.html.replace(/\[/g, '<b ng-bind="');
    story.html = newHtml.replace(/\]/g, '"></b>');

    storiesService.postStory(story).then(function(error, res){
      debugger;
      console.log(res)
    })
  }

  $scope.add = function () {
    $scope.story.inputs.push({
      title: ""
    });
  };
});
