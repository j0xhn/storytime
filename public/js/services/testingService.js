angular.module('services')
.service('testingService', function () {
  var ts = {};

  // needs to be run from the /submit page
  ts.submitTestStoryFromPage = function(){
    var scope = angular.element('form').scope();
    var story = scope.story;
    scope.add();
    scope.$digest();
    story.title = 'Test Story Title';
    story.photoUrl = '/images/local_500x500.jpg';
    story.price = '1';
    story.ages = '3-5';
    story.length = '5';
    story.tags = "test, tags, hipster's dream, w13rd ch@rc!ers";
    story.shortDesc = "Speedy McQueen takes some lucky kids on a trip!";
    story.longDesc = "Long Desc: Speedy McQueen takes some lucky kids on a trip! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    story.html = "Write your story here.  Include your interactive keywords with square brackets like such: [keyword]";
    story.inputs[0].keyword = 'keyword';
    story.inputs[0].title = 'Sample Label';
    scope.$digest();
    // angular.element('form').scope().submitStory();

  };

  ts.testStory = {
    _id: "1",
    createdAt: 'Wed Aug 17 2016 18:32:05 GMT-0600 (MDT)',
    updatedAt: 'Wed Aug 17 2016 18:32:05 GMT-0600 (MDT)',
    title: "Test Story Title",
    ages: '3-5',
    length: '5',
    shortDesc: "Speedy McQueen takes some lucky kids on a trip!",
    longDesc: "Long Desc: Speedy McQueen takes some lucky kids on a trip! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    photoUrl:"/js/images/local_500x500.jpg",
    authorName: 'Test Author Name',
    authorId: '57b4ebfbd630dfae403d6497',
    tags: ['friend','vehicle','test','travel','road rage'],
    inputs:{
      first:   { title:"Temporary Variable", keyword: 'first', type: 'text'},
      main:   { title:"Does This Mimic Above?", keyword: 'main', type: 'text'}
    },
    html:'Here is a sample story,<b ng-bind=\"main\"></b> lets see if this works <b ng-bind=\"first\"></b>'
  };

  return ts;
});
