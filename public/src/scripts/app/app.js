var PokeMean = angular.module('PokeMean', ['ngRoute', 'ngResource']);

PokeMean.run(['$rootScope', function ($rootScope) {
  console.log('App is running!');
}]);

PokeMean.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: '/views/main/home.html',
    controller: 'HomeCtrl'
  })
  .when('/browse', {
    templateUrl: '/views/main/browse.html',
    controller: 'BrowseCtrl'
  })
  .when('/my-team', {
    templateUrl: '/views/user/my-team.html',
    controller: 'MyTeamCtrl'
  })
  .when('/profile', {
    templateUrl: '/views/user/profile.html',
    controller: 'ProfileCtrl'
  })
  .otherwise({
    templateUrl: '/views/error/404.html'
  });

}]);