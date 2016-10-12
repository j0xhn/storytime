angular.module('directives')
	.directive('landing', function () {
		return {
			restrict: 'EA',
			replace: true,
      controller: function($scope, storiesService, $rootScope, userService, utilityService, analyticService, $location) {
				$scope.exampleStoryId = '57ee7ef2002a8c317ffe5c30';
				$scope.pictureArray = [
					'cactus',
					'cloud-1',
					'crown',
					'cylinder_hat',
					'fish-1',
					'fish-2',
					'snake-tail',
					'girl-1',
					'girl-4'
				];

				const animationInterval = setInterval(function () {
					const girlImage = document.querySelector('.girl-4');
					girlImage.classList.toggle('move');
				}, 6000);

				$rootScope.$on("$routeChangeStart", function(event, next, current){
					clearInterval(animationInterval);
				});

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
					$scope.isLoggedIn = userService.user.email;
          $scope.subscribeButtonClick = function(email){
            if(utilityService.validateEmail(email)){
              const currentUser = userService.user;
              if(currentUser.email === email){
								$scope.emailError = 'Email already exists'
                // take them to their account page to manage their subscriptions
              } else {
                userService.setUserInfo({email: email}).then(function(res){
                  if(res.data.error){
										analyticService.error('landing email', res.data.error)
										$scope.emailError = res.data.error
                  } else {
										$scope.isLoggedIn = true;
										$scope.emailSuccess = true;
                  }
                });
              }
            } else {
              $scope.emailError = 'Please enter a valid email address';
							$scope.$apply();
            }
          }
      },
			templateUrl: '/pages/landing/landing.html',
			scope: {}
		}
	}
)
