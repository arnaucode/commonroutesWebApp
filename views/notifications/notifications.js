'use strict';

angular.module('app.notifications', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/notifications', {
            templateUrl: 'views/notifications/notifications.html',
            controller: 'NotificationsCtrl'
        });
    }])

    .controller('NotificationsCtrl', function($scope, $http) {
        $scope.notifications = [];

        $http.get(urlapi + 'notifications')
          .then(function(data) {
            //get the storage notifications
            if (localStorage.getItem("cr_webapp_notifications")) {
              $scope.notifications = JSON.parse(localStorage.getItem("cr_webapp_notifications"));
              $scope.notifications = $scope.notifications.concat(data.data); // for UI
            } else {
              $scope.notifications = data.data;
            }
            //store the notifications
            localStorage.setItem("cr_webapp_notifications", JSON.stringify($scope.notifications));

          }, function(data) {
            console.log('data error');
            toastr.error("Error connecting server");

          });
    });
