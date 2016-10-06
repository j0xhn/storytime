angular.module('directives')
	.directive('landing', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService) {
				$scope.exampleStoryId = '57ee7ef2002a8c317ffe5c30';
        // for dialoge in hero
         var theater = theaterJS();
         theater
           .addActor('values', { speed: 0.8, accuracy: 0.6 })
           .addScene('values: be strong', 600)
           .addScene('values: be successfull.', 800)
           .addScene('values: get good grades', 700)
           .addScene('values: eat healthy', 600)
           .addScene('values: put on sunscreen', 800)
           .addScene('values: be a good friend', 400)
           .addScene('values: deal with a school bully', 900)
           .addScene('values: I think you get the gist', 900)
           .addScene('values: basically they are simple stories', 900)
           .addScene('values: that have your child as the main star', 900)
           .addScene('values: it is really cool, give it a try!', 900)
           .addScene('values: get ready for your child to learn to', 900)
           .addScene(theater.replay.bind(theater))
          // end dialog
          $scope.subscribeButtonClick = function(email){
            console.log("made it here");
            debugger;
          }
      },
			templateUrl: '/pages/landing/landing.html',
			scope: {}
		}
	}
)
