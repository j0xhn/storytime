angular.module('starter.story', [])
.controller('StoryCtrl', function($scope, $stateParams, $timeout, $compile, StoriesService) {
  $scope.storyObj = StoriesService.getSingleStory($stateParams.storyId);
  var inputsArray = $scope.storyObj.inputs ? Object.keys($scope.storyObj.inputs) : [];
  for (var i = 0, len = inputsArray.length; i < len; i++) {
      var inputRegex = new RegExp('"'+inputsArray[i]+'"','g');
      $scope.storyObj.html = $scope.storyObj.html.replace(inputRegex,'"storyObj.inputs.'+inputsArray[i]+'.value"')
  }

  $timeout(function(){
    // TODO: un-hack this
    // done because angular strips out attributes on span
    // if used in ng-bind-html -- however, sometimes it
    // doesn't execute on time
    var storyDiv = document.getElementById('replace-with-html');
    storyDiv.innerHTML = $scope.storyObj.html;
    $compile(storyDiv)($scope);
  },100)
});
