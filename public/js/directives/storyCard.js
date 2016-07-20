angular.module('miniApp.directives', [])
	.directive('storyCard', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/views/storycard.html',
			scope: {
				story: '='
			},
			link: function(a,b,c){
				debugger;
			}
		}
	}
)
