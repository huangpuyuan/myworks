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
        //每页数据量
        $scope.pageSize = 1;
        //当前页码 默认为首页
        $scope.selPage = 1;

        $http.get('data.php').then(function(resp) {
            $scope.list = resp.data.data;
            //console.log($scope.list);
            $scope.data = $scope.list;

            $scope.pages = Math.ceil($scope.data.length / $scope.pageSize);
            //页码偏移量
            $scope.pageOffset = 2;
            $scope.newPages = $scope.pages > ($scope.pageOffset * 2 + 1) ? ($scope.pageOffset * 2 + 1) : $scope.pages;

            $scope.pageList = [];
            //$scope.inputPage = 1;

            $scope.setData = function() {
                $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
            }

            $scope.items = $scope.data.slice(0, $scope.pageSize);


            $scope.selectPage = function(page) {
                //不能小于1大于最大
                if (page < 1 || page > $scope.pages) return;
                //最多显示分页数5
                var newpageList = [];
                if (page <= $scope.pageOffset) {
                    for (var i = 0; i < $scope.newPages; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;

                } else if (page > $scope.pageOffset && page <= $scope.pages - $scope.pageOffset) {
                    for (var i = (page - $scope.pageOffset - 1); i < (page + $scope.pageOffset); i++) {
                        console.log(page);
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                } else {
                    for (var i = ($scope.pages - $scope.newPages); i < $scope.pages; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                console.log('新页码:', newpageList);
                console.log($scope.pageList);
                console.log('input:', $scope.inputPage);

                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                console.log("选择的页：" + page);
            };


            $scope.goto = function(inputPage) {
                if (!isNaN(inputPage)) {
                    console.log('跳转至', inputPage);
                    $scope.selectPage(parseInt(inputPage));
                }
            };

            $scope.isActivePage = function(page) {
                return $scope.selPage == page;
            };

            //首页、上一页图标失效
            $scope.isFirstDisabled = function(page) {
                return $scope.selPage == 1;
            }

            //尾页、下一页图标失效    
            $scope.isLastDisabled = function(page) {
                return $scope.selPage == $scope.pages;
            }

            //首页
            $scope.firstPage = function() {
                $scope.selectPage(1);
            }

            //尾页
            $scope.lastPage = function() {
                $scope.selectPage($scope.pages);
            }

            //上一页
            $scope.Previous = function() {
                $scope.selectPage($scope.selPage - 1);
            };

            //下一页
            $scope.Next = function() {
                $scope.selectPage($scope.selPage + 1);
            };

            //激活第一页
            $scope.selectPage($scope.selPage);

            //console.log($scope.pageList);
        }, function(err) {

        });

    }]);

    myApp.controller('detailCtrl', ['$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {
        $http.get('data.php?id=' + $state.params.id).then(function(resp) {
            var urlId = $state.params.id;
            $scope.detail = resp.data.data;
            $scope.intense();
        });

        $scope.intense = function() {
            var elements = document.querySelectorAll('.demo-image');
            Intense(elements);
        }


    }]);

    myApp.filter('to_trusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]).run(function($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

    });


})();
