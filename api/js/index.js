;
(function() {
    "use strict";

    var myApp = angular.module('myApp', ['ui.router']);

    myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('main', {
            url: '/main',
            templateUrl: './view/main.html',
            controller: 'myCtrl'
        }).state('detail', {
            url: '/detail/:id',
            templateUrl: './view/detail.html',
            controller: 'detailCtrl'
        });

        $urlRouterProvider.otherwise('main');
    }]);


    myApp.controller('myCtrl', ['$scope', '$http', '$state', '$q', function($scope, $http, $state, $q) {
        $http.get('data.php').then(function(resp) {
            $scope.list = resp.data.data;
            console.log($scope.list);
        }, function(err) {

        });

        // $scope.tClick = function(id, data) {
        //     console.log(id);
        //     $state.go('detail');
        // }

    }]);

    myApp.controller('detailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
        $http.get('data.php?id=' + $state.params.id).then(function(resp) {
            var urlId = $state.params.id;
            $scope.detail = resp.data.data;
            console.log($scope.detail); 
            //$scope.detail = {};
            // angular.forEach($scope.list, function(data) {
            //     if (data.id == urlId) {
            //         $scope.detail = data;
            //         return $scope.detail;
            //     }
            // });
        })
    }]).filter('to_trusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);



})();
