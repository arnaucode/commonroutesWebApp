'use strict';

angular.module('app.search', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search/:searchstring', {
            templateUrl: 'views/search/search.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', function($scope, $http, $routeParams) {
        $scope.users = [];
        $scope.travels = [];
        $scope.loadMorePagination = true;
        $scope.page = 0;
        $scope.searchString = $routeParams.searchstring;
        $http.get(urlapi + 'search/' + $routeParams.searchstring)
            .then(function(data) {
                console.log('data success travels');
                console.log(data);
                $scope.users = data.data.users;
                $scope.travels = data.data.travels;

            }, function(data) {
                console.log('data error');
            });
    });
