'use strict';

angular.module('app.userLikes', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/userLikes/:userid', {
            templateUrl: 'views/userLikes/userLikes.html',
            controller: 'UserLikesCtrl'
        });
    }])

    .controller('UserLikesCtrl', function($scope, $http, $routeParams) {
        $scope.likes = {};
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

        
    });
