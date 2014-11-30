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
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/map', {
        templateUrl: 'views/about.html',
        controller: 'MapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
