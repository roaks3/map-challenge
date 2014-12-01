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
    'ngSanitize',
    'uiGmapgoogle-maps',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
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

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyClcQJun2pdRiqD1ik2lqIbcLshJ3WL6QE',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });

  });
