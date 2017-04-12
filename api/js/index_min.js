(function(){angular.module("myApp",["ui.router"]);var a=angular.module("myApp");a.config(["$stateProvider","$urlRouterProvider",function(c,b){c.state("main",{url:"/main",templateUrl:"./view/main.html",controller:"myCtrl"}).state("detail",{url:"/detail/:id",templateUrl:"./view/detail.html",controller:"detailCtrl"});b.otherwise("main")}]);a.controller("myCtrl",["$rootScope","$scope","$http","$state","$q",function(b,d,f,e,c){d.pageSize=4;d.selPage=1;f.get("data.php").then(function(g){d.list=g.data.data;b.listOfId=[];d.list.forEach(function(h){b.listOfId.push(parseInt(h.id))});d.data=d.list;d.pages=Math.ceil(d.data.length/d.pageSize);d.pageOffset=2;d.newPages=d.pages>(d.pageOffset*2+1)?(d.pageOffset*2+1):d.pages;d.pageList=[];d.setData=function(){d.items=d.data.slice((d.pageSize*(d.selPage-1)),(d.selPage*d.pageSize))};d.selectPage=function(k){if(k<1||k>d.pages){return}var j=[];if(k<=d.pageOffset){for(var h=0;h<d.newPages;h++){j.push(h+1)}d.pageList=j}else{if(k>d.pageOffset&&k<=d.pages-d.pageOffset){for(var h=(k-d.pageOffset-1);h<(k+d.pageOffset);h++){j.push(h+1)}d.pageList=j}else{for(var h=(d.pages-d.newPages);h<d.pages;h++){j.push(h+1)}d.pageList=j}}d.selPage=k;d.setData();d.isActivePage(k)};d.enterEvent=function(i){var h=window.event?i.keyCode:i.which;if(h==13){d.gotoPage(d.inputPage)}};d.gotoPage=function(h){if(!isNaN(h)&&(h)){d.selectPage(parseInt(h))}};d.isActivePage=function(h){return d.selPage==h};d.isFirstDisabled=function(h){return d.selPage==1};d.isLastDisabled=function(h){return d.selPage==d.pages};d.firstPage=function(){d.selectPage(1)};d.lastPage=function(){d.selectPage(d.pages)};d.Previous=function(){d.selectPage(d.selPage-1)};d.Next=function(){d.selectPage(d.selPage+1)};d.selectPage(d.selPage)},function(g){})}]);a.controller("detailCtrl",["$rootScope","$scope","$http","$state","$timeout",function(b,c,g,e,d){var f=[];c.isNextDisabled=c.isPrevDisabled=false;g.get("work.php?id="+e.params.id).then(function(h){if(h.data.code>=400){e.go("main")}c.urlId=e.params.id;c.detail=h.data.data;c.intense()});if(!b.listOfId){g.get("data.php").then(function(h){b.listOfId=[];h.data.data.forEach(function(i){b.listOfId.push(parseInt(i.id))});f=b.listOfId})}else{f=b.listOfId}d(function(){c.switchWork=function(j,h){h=h||1;if(!f){return}if(!isNaN(h)){if(h==0){return}var i=f[f.indexOf(parseInt(j))-h];if(i){e.go("detail",{id:i})}else{(h>0)?c.isNextDisabled=true:c.isPrevDisabled=true}}}},200);c.intense=function(){var h=document.querySelectorAll(".demo-image");Intense(h)}}]);a.filter("to_trusted",["$sce",function(b){return function(c){return b.trustAsHtml(c)}}]);a.run(["$rootScope","$state","$stateParams",function(b,c,d){b.$state=c;b.$stateParams=d;b.$on("$stateChangeSuccess",function(){document.body.scrollTop=document.documentElement.scrollTop=0})}])})();