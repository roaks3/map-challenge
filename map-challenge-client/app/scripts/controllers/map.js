
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
    $scope.orders = [];
    $scope.map = { center: { latitude: 37.7577, longitude: -122.4376 }, zoom: 12,
      heatLayerCallback: function (layer) {
        var heatmapData = $scope.orders.map(function(order) {
          return order.latlng;
        });
        layer.setData(new google.maps.MVCArray(heatmapData));
      }
    };

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

    $http({
      method: 'GET',
      url: 'http://localhost:9005/orders'
    }).
    success(function(response) {
      angular.forEach(response, function(order) {
        $scope.orders.push({id: order.id, latlng: new google.maps.LatLng(order.latitude, order.longitude)});
      });
    }).
    error(function(response) {
      console.log("error");
      console.log(response || "Request failed");
    });

  });
