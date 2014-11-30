
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

    $scope.hubs = [];
    $scope.map = { center: { latitude: 37.7577, longitude: -122.4376 }, zoom: 12 };

    $http({
      method: 'GET',
      url: 'http://localhost:9005/hubs'
    }).
    success(function(response) {
      angular.forEach(response, function(hub) {
        $scope.hubs.push({id: hub.id, location: {longitude: hub.long, latitude: hub.lat}});
      });
    }).
    error(function(response) {
      console.log("error");
      console.log(response || "Request failed");
    });

  });
