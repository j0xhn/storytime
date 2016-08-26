angular.module('directives')
	.directive('story', function () {
		return {
			restrict: 'E',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, storiesService) {
        /*
        All logic for if have purchased story is done in the routing
        if they come to this view, it should be because it's been purchased,
        or because I have specifically passed in the id of the story I want
        */

        const storyId = $routeParams.storyId ? $routeParams.storyId : $scope.storyid
        storiesService.searchStories(storyId).then(function(res){
          debugger;
          $scope.storyObj = res.data.stories[0];
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
          },100);
        });
      },
			templateUrl: '/partials/story/story.html',
			scope: {
        storyid: '@'
      }
		}
	}
)
