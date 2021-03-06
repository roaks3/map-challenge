
'use strict';

/**
 * @ngdoc function
 * @name mapChallengeClientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the mapChallengeClientApp
 */
angular.module('mapChallengeClientApp')
  .controller('MapCtrl', function ($scope, $http, $q, uiGmapGoogleMapApi) {

    $scope.totalOrders = 0;
    $scope.totalItems = 0;

    $scope.map = { center: { latitude: 37.7577, longitude: -122.4376 }, zoom: 12,
      heatLayerCallback: function (layer) {
        $scope.heatmapLayer = layer;
        $scope.refreshOrders();
      }
    };

    $scope.startPicker = {date: new Date(2014, 2, 1), open: function($event) {$scope.datePickerOpen($event, $scope.startPicker)}};
    $scope.endPicker = {date: new Date(2014, 2, 30), open: function($event) {$scope.datePickerOpen($event, $scope.endPicker)}};

    $scope.$watch('startPicker.date', function() {
      $scope.refreshOrders();
    });

    $scope.$watch('endPicker.date', function() {
      $scope.refreshOrders();
    });

    $scope.datePickerOpen = function($event, datePicker) {
      $event.preventDefault();
      $event.stopPropagation();

      datePicker.opened = true;
    };

    $scope.refreshOrders = function() {
      $scope.getOrders().then(function (orders) {
        $scope.orders = orders;
        $scope.refreshHeatmap();

        $scope.totalOrders = 0;
        $scope.totalItems = 0;
        angular.forEach($scope.orders, function(order) {
          $scope.totalOrders++;
          $scope.totalItems += order.num_items;
        });
      });
    };

    $scope.refreshHeatmap = function() {
      if (!$scope.heatmapLayer) {
        return;
      }

      var heatmapData = $scope.orders.map(function(order) {
        return order.latlng;
      });
      $scope.heatmapLayer.setData(new google.maps.MVCArray(heatmapData));
    };

    $scope.hubClicked = function(hub) {
      hub.selected = !hub.selected;
      if (hub.selected) {
        hub.icon = 'images/restaurant-select.png';
      } else {
        hub.icon = 'images/restaurant-unselect.png';
      }
      $scope.refreshOrders();
    };

    $scope.getHubs = function() {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'http://localhost:9005/hubs'
      }).
      success(function(response) {
        var hubs = []
        angular.forEach(response, function(hub) {
          var hub = {id: hub.id, location: {longitude: hub.long, latitude: hub.lat}, selected: true, icon: 'images/restaurant-select.png', 
            onClicked: function() {
              $scope.hubClicked(hub);
            }
          };
          hubs.push(hub);
        });
        deferred.resolve(hubs);
      }).
      error(function(response) {
        console.log("error");
        console.log(response || "Request failed");
        deferred.reject(response);
      });

      return deferred.promise;
    };

    $scope.getOrders = function() {
      var deferred = $q.defer();

      var selected_hub_ids = $scope.hubs.filter(function(hub) {
        return hub.selected;
      }).map(function(hub) {
        return hub.id;
      });

      $http({
        method: 'POST',
        url: 'http://localhost:9005/orders',
        data: {hub_ids: selected_hub_ids, start: $scope.startPicker.date, end: $scope.endPicker.date}
      }).
      success(function(response) {
        var orders = [];
        angular.forEach(response, function(order) {
          orders.push({id: order.id, latlng: new google.maps.LatLng(order.latitude, order.longitude), num_items: order.num_items});
        });
        deferred.resolve(orders);
      }).
      error(function(response) {
        console.log("error");
        console.log(response || "Request failed");
        deferred.reject(response);
      });

      return deferred.promise;
    };

    $scope.hubs = [];
    $scope.orders = [];
    $scope.getHubs().then(function (hubs) {
      $scope.hubs = hubs;
    });

  });
