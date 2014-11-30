
'use strict';

/**
 * @ngdoc function
 * @name mapChallengeClientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mapChallengeClientApp
 */
angular.module('mapChallengeClientApp')
  .controller('MapCtrl', function ($scope, $http) {

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

    var mapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  });
