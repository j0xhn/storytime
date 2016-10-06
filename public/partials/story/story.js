angular.module('directives')
	.directive('story', function () {
		return {
			restrict: 'E',
			replace: true,
      controller:  function($scope, $routeParams, $timeout, $compile, storiesService) {
        var storyId = $scope.storyid ? $scope.storyid : $routeParams.storyId;
        var applyStoryToView = function(storyObj){
          $scope.storyObj = storyObj;
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
        };


        if ($scope.storyobj){
          applyStoryToView($scope.storyobj);
        } else {
          storiesService.searchStories({_id:storyId}).then(function(res){
            applyStoryToView(res.data);
          });
        }


      },
			templateUrl: '/partials/story/story.html',
			scope: {
        storyid: '@',
        storyobj: '=',
        excludeimage: '@'
      }
		}
	}
)
