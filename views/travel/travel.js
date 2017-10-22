'use strict';

angular.module('app.travel', ['ngRoute', 'ui-leaflet'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/travel/:travelid', {
            templateUrl: 'views/travel/travel.html',
            controller: 'TravelCtrl'
        });
    }])

    .controller('TravelCtrl', function($scope, $http, $routeParams,
        leafletData, leafletBoundsHelpers, toastr) {

        $scope.storageuser = JSON.parse(localStorage.getItem("cr_webapp_userdata"));
        $scope.travel = {};


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

        $http.get(urlapi + 'travels/id/' + $routeParams.travelid)
            .then(function(data, status, headers, config) {
                console.log('data success');
                console.log(data);

                $scope.travel = data.data;

                //map
                $scope.markers = [];
                $scope.markers.push({
                    lat: Number($scope.travel.from.lat),
                    lng: Number($scope.travel.from.long),
                    message: $scope.travel.from.name
                });
                $scope.markers.push({
                    lat: Number($scope.travel.to.lat),
                    lng: Number($scope.travel.to.long),
                    message: $scope.travel.to.name
                });
                $scope.center = {
                    lat: (Number($scope.travel.from.lat) + Number($scope.travel.to.lat)) / 2,
                    lng: (Number($scope.travel.from.long) + Number($scope.travel.to.long)) / 2,
                    zoom: 4
                };
            }, function(data, status, headers, config) {
                console.log('data error');
            });


        //delete travel
        $scope.deleteTravel = function() {
            console.log("delete travel: " + $routeParams.travelid);
            $http({
                    url: urlapi + '/admin/travels/id/' + $routeParams.travelid,
                    method: "DELETE"
                })
                .then(function(data) {
                        console.log(data);
                        $scope.travels = data.data;
                          toastr.info('Travel deleted');

                        window.location = "#!/main/";
                    },
                    function(data) { // optional
                        // failed
                          toastr.error('Error on delete travel');
                    });
        };

        $scope.joinTravel = function() {
          $http({
              url: urlapi + 'travels/join/' + $routeParams.travelid,
              method: "POST",
              data: {}
            })
            .then(function(data) {
                console.log("data: ");
                console.log(data);
                if (data.data.success == false) {
                  toastr.error('Error on join');
                } else {
                  $scope.travel = data.data;
                    toastr.success('Joined travel');
                }
              },
              function(response) { // optional
                // failed
              });
        };
        $scope.unjoinTravel = function() {
          $http({
              url: urlapi + 'travels/unjoin/' + $routeParams.travelid,
              method: "POST",
              data: {}
            })
            .then(function(data) {
                console.log("data: ");
                console.log(data);
                if (data.data.success == false) {
                  toastr.error('Error on unjoin');
                } else {
                  $scope.travel = data.data;
                    toastr.success('Unjoined travel');
                }
              },
              function(response) { // optional
                // failed
              });
        };

        $scope.declineJoin = function(joinPetition) {
          $http({
              url: urlapi + 'travels/declineJoin/' + $routeParams.travelid,
              method: "POST",
              data: {
                userid: joinPetition._id
              }
            })
            .then(function(data) {
                console.log("data: ");
                console.log(data);
                if (data.data.success == false) {
                  toastr.error('Error on declining');
                } else {
                  $scope.travel = data.data;
                  console.log("success");
                  toastr.success('Join declined');
                }
              },
              function(response) { // optional
                // failed
              });
        };

        $scope.acceptJoin = function(joinPetition) {
          $http({
              url: urlapi + 'travels/acceptJoin/' + $routeParams.travelid,
              method: "POST",
              data: {
                userid: joinPetition._id
              }
            })
            .then(function(data) {
                console.log("data: ");
                console.log(data);
                if (data.data.success == false) {
                  toastr.error('Error on accepting');
                } else {
                  $scope.travel = data.data;
                  console.log("success");
                  toastr.success('Join accepted');
                }
              },
              function(response) { // optional
                // failed
              });
        };

        $scope.leaveTravel = function() {

          $http({
              url: urlapi + 'travels/leave/' + $routeParams.travelid,
              method: "POST",
              data: {}
            })
            .then(function(data) {
                console.log("data: ");
                console.log(data);
                if (data.data.success == false) {
                  toastr.error('Error on leave');
                } else {
                  $scope.travel = data.data;
                  toastr.success('Travel leaved');
                }
              },
              function(response) { // optional
                // failed
              });
        };


        $scope.userHasJoined = function(myArray, searchTerm) {
          //console.log(myArray+", "+searchTerm);
          if (myArray) {
            for (var i = 0, len = myArray.length; i < len; i++) {
              //console.log(myArray[i] + " - " + searchTerm);
              if (myArray[i]._id === searchTerm) {
                //console.log("i: " + i);
                return i;
              }
            }
          }
          //console.log("i: -1");
          return -1;
        };

    });
