'use strict';

/**
 * @ngdoc overview
 * @name mapChallengeClientApp
 * @description
 * # mapChallengeClientApp
 *
 * Main module of the application.
 */
angular
  .module('mapChallengeClientApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
