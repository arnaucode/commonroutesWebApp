'use strict';

angular.module('app.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user/:userid', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', function($scope, $http, $routeParams) {
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

        //delete user
        $scope.deleteUser = function() {
            console.log("delete user: " + $routeParams.userid);
            $http({
                    url: urlapi + 'admin/users/id/' + $routeParams.userid,
                    method: "DELETE"
                })
                .then(function(data) {
                        window.location = "#!/main/";
                    },
                    function(data) { // optional
                        // failed
                    });
        };
        $scope.validateUser = function() {
            $http({
                    url: urlapi + 'admin/users/validate/id/' + $routeParams.userid,
                    method: "POST",
                    data: {}
                })
                .then(function(data) {
                        /*window.location = "#!/main/";*/
                        $scope.user = data.data;
                    },
                    function(data) { // optional
                        // failed
                    });
        };
        $scope.unvalidateUser = function() {
            $http({
                    url: urlapi + 'admin/users/unvalidate/id/' + $routeParams.userid,
                    method: "POST",
                    data: {}
                })
                .then(function(data) {
                        /*window.location = "#!/main/";*/
                        $scope.user = data.data;
                    },
                    function(data) { // optional
                        // failed
                    });
        };
    });
