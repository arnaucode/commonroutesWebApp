'use strict';

angular.module('app.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user/:userid', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', function($scope, $http, $routeParams, toastr) {
        $scope.storageuser = JSON.parse(localStorage.getItem("cr_webapp_userdata"));

        $scope.user = {};
        $scope.likes = {};
        $http.get(urlapi + 'users/id/' + $routeParams.userid)
            .then(function(data, status, headers, config) {
                console.log('data success');
                console.log(data);

                $scope.user = data.data;
            }, function(data, status, headers, config) {
                console.log('data error');
            });
        $http.get(urlapi + 'users/id/likes/' + $routeParams.userid)
            .then(function(data, status, headers, config) {
                console.log('data success');
                console.log(data);
                $scope.likes = data.data;
                $scope.$broadcast('scroll.refreshComplete'); //refresher stop
            }, function(data, status, headers, config) {
                console.log('data error');
                $scope.$broadcast('scroll.refreshComplete'); //refresher stop
            });

            $scope.likeUser = function() {
              $http({
                  //url: urlapi + 'users/'+ $stateParams.username+'/fav',
                  url: urlapi + 'users/id/like/' + $scope.user._id,
                  method: "POST",
                  data: {}
                })
                .then(function(data) {
                    // success
                    if (data.data.success == false) {
                      console.log("failed");
                     toastr.error("Error on like");
                    } else {
                      $scope.user = data.data; // for UI
                    }
                  },
                  function(response) { // optional
                    // failed
                  });
            };
            $scope.unlikeUser = function() {
              $http({
                  //url: urlapi + 'users/'+ $stateParams.username+'/fav',
                  url: urlapi + 'users/id/unlike/' + $scope.user._id,
                  method: "POST",
                  data: {}
                })
                .then(function(data) {
                    // success
                    if (data.data.success == false) {
                      console.log("failed");
                     toastr.error("Error on unlike");
                    } else {
                      $scope.user = data.data; // for UI
                    }
                  },
                  function(response) { // optional
                    // failed
                  });
            };

            $scope.arrayObjectIndexOf = function(myArray, searchTerm) {
              if (myArray) {
                for (var i = 0, len = myArray.length; i < len; i++) {
                  if (myArray[i] === searchTerm) {
                    return i;
                  }
                }
              }
              return -1;
            };
    });
