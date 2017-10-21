'use strict';

angular.module('app.newTravel', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/newTravel', {
            templateUrl: 'views/newTravel/newTravel.html',
            controller: 'NewTravelCtrl'
        });
    }])

    .controller('NewTravelCtrl', function($scope, $http, toastr) {
        $scope.travel = {};

        $scope.selectType = function(type) {
            $scope.travel.type = type;
        };

        //map
        $scope.center = {
            /*lat: 0,
            lng: 0,
            zoom: 1*/
        };
        $scope.bounds = {};
        $scope.markers = [];
        $scope.tiles = {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        };

        $scope.doNewTravel = function() {
            $scope.postNewTravel();
        };
        $scope.postNewTravel = function() {
            $http({
                    url: urlapi + 'travels',
                    method: "POST",
                    data: $scope.travel
                })
                .then(function(data) {
                        console.log(data);
                        window.location = "#app/travels";
                    },
                    function(data) { // optional
                        // failed
                        console.log(data);
                        toastr.warning('Complete all parameters first');

                    });
        };
        $scope.allParametersCompleted = function() {
            if (($scope.travel.title != undefined) &&
                ($scope.travel.from != undefined) &&
                ($scope.travel.to != undefined) &&
                ($scope.travel.date != undefined) &&
                ($scope.travel.seats != undefined) &&
                ($scope.travel.type != undefined)) {
                return true;
            } else {
                return false;
            }
        };
    });
