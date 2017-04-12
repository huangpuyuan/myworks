;
(function() {
    "use strict";

    angular.module('myApp', ['ui.router']);

    var myApp = angular.module('myApp');

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


    myApp.controller('myCtrl', ['$rootScope', '$scope', '$http', '$state', '$q', function($rootScope, $scope, $http, $state, $q) {

        //每页数据量
        $scope.pageSize = 4;
        //当前页码 默认为首页
        $scope.selPage = 1;

        $http.get('data.php').then(function(resp) {

            $scope.list = resp.data.data;
            $rootScope.listOfId = [];
            $scope.list.forEach(function(e) {
                $rootScope.listOfId.push(parseInt(e.id));
            });


            //console.log($rootScope.listOfId);

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

            //$scope.items = $scope.data.slice(0, $scope.pageSize);


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
                        //console.log(page);
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                } else {
                    for (var i = ($scope.pages - $scope.newPages); i < $scope.pages; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                // console.log('新页码:', newpageList);
                // console.log($scope.pageList);
                // console.log('input:', $scope.inputPage);

                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                //console.log("选择的页：" + page);
            };

            //监听回车事件
            $scope.enterEvent = function(e) {
                var keycode = window.event ? e.keyCode : e.which;
                if (keycode == 13) {
                    $scope.goto($scope.inputPage);
                };
            };

            $scope.goto = function(inputPage) {
                if (!isNaN(inputPage)) {
                    //console.log('跳转至', inputPage);
                    $scope.selectPage(parseInt(inputPage));
                }
            };

            $scope.isActivePage = function(page) {
                return $scope.selPage == page;
            };

            //首页、上一页图标失效
            $scope.isFirstDisabled = function(page) {
                return $scope.selPage == 1;
            };

            //尾页、下一页图标失效    
            $scope.isLastDisabled = function(page) {
                return $scope.selPage == $scope.pages;
            };

            //首页
            $scope.firstPage = function() {
                $scope.selectPage(1);
            };

            //尾页
            $scope.lastPage = function() {
                $scope.selectPage($scope.pages);
            };

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

    myApp.controller('detailCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {

        var ids = [];
        $scope.isNextDisabled = $scope.isPrevDisabled = false;

        $http.get('work.php?id=' + $state.params.id).then(function(resp) {
            if (resp.data.code >= 400) {
                $state.go('main');
            }
            $scope.urlId = $state.params.id;
            $scope.detail = resp.data.data;
            $scope.intense();

        });

        if (!$rootScope.listOfId) {
            $http.get('data.php').then(function(resp) {
                $rootScope.listOfId = [];
                resp.data.data.forEach(function(e) {
                    $rootScope.listOfId.push(parseInt(e.id));
                });
                ids = $rootScope.listOfId;
            });
        } else {
            ids = $rootScope.listOfId;
        }


        //防止ng-click点击过快
        $timeout(function() {
            //合并了向前和向后两个事件,第二个参数为向后翻几页,负数为向前翻一页如-1,默认为1向后翻一页
            $scope.switchWork = function(urlId, pages) {
                pages = pages || 1;
                if (!ids) return;
                if (!isNaN(pages)) {
                    if (pages == 0) return;
                    var newId = ids[ids.indexOf(parseInt(urlId)) - pages];
                    if (newId) {
                        $state.go('detail', { id: newId });
                    } else {
                        (pages > 0) ? $scope.isNextDisabled = true: $scope.isPrevDisabled = true;
                    }
                }
            }
        }, 200);

        /*  
        $scope.prevWork = function(urlId) {
            if (ids) {
                var prevId = ids[ids.indexOf(parseInt(urlId)) + 1];
                // if (prevId < Math.min.apply(null, ids)) {
                //     $scope.isPrevDisabled = true;
                //     return;
                // }
                //if(ids.indexOf(prevId) > -1){}
                if (prevId) {
                    $state.go('detail', { id: prevId });
                } else {
                    $scope.isPrevDisabled = true;
                }
            }
        }*/

        /*$scope.nextWork = function(urlId) {
            if (ids) {
                var nextId = ids[ids.indexOf(parseInt(urlId)) - 1];
                // if (nextId > Math.max.apply(null, ids)) {
                //     $scope.isNextDisabled = true;
                //     return;
                // }
                console.log(nextId);
                if (nextId) {
                    $state.go('detail', { id: nextId });
                } else {
                    $scope.isNextDisabled = true;
                }
            }
        }
        
        */

        //递归判断发送请求法
        /*$scope.times = 0;

        $scope.prevWork = function(urlId) {
            var prevId = parseInt(urlId) - 1;
            $http.get('work.php?id=' + prevId).then(function(resp) {
                if ($scope.times > 10) {
                    $scope.isPrevDisabled = true;
                    $scope.times = 0;
                    return;
                }
                if (resp.data.code == 200) {
                    $scope.urlId = prevId;
                    $scope.detail = resp.data.data;
                    $scope.isPrevDisabled = $scope.isNextDisabled = false;
                } else {
                    $scope.times++;
                    $scope.prevWork(prevId);
                }

            });
        };

        $scope.nextWork = function(urlId) {
            var nextId = parseInt(urlId) + 1;
            $http.get('work.php?id=' + nextId).then(function(resp) {
                if ($scope.times > 10) {
                    $scope.isNextDisabled = true;
                    $scope.times = 0;
                    return;
                }
                if (resp.data.code == 200) {
                    $scope.urlId = nextId;
                    $scope.detail = resp.data.data;
                    $scope.isNextDisabled = $scope.isPrevDisabled = false;
                } else {
                    $scope.times++;
                    $scope.nextWork(nextId);
                }
            });
        };*/


        $scope.intense = function() {
            var elements = document.querySelectorAll('.demo-image');
            Intense(elements);
        }


    }]);

    myApp.filter('to_trusted', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

    myApp.run(function($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

    });


})();
