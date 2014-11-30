
'use strict';

/**
 * @ngdoc function
 * @name mapChallengeClientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mapChallengeClientApp
 */
angular.module('mapChallengeClientApp')
  .controller('MapCtrl', function ($scope, $http, uiGmapGoogleMapApi) {

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $http({
      method: 'GET',
      url: 'http://localhost:9005/hubs'
    }).
    success(function(response) {
      console.log("success");
      console.log(JSON.stringify(response));
    }).
    error(function(response) {
      console.log("error");
      console.log(response || "Request failed");
    });

  });
