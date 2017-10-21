'use strict';

angular.module('app.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'views/users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', function($scope, $http) {
        $scope.users = [];
        $scope.loadMorePagination = true;
        $scope.pageUsers = 0;
        $http.get(urlapi + 'users?page=' + $scope.pageUsers)
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.users = data.data;

            }, function(data) {
                console.log('data error');
            });
    });
