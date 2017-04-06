myApp.config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider) {
	$stateProvider.state('login',{
		url:'/login',
		templateUrl:'modules/users/login.html',
		controller:'loginController'
	}).state('signup',{
		url:'/signup',
		templateUrl:'modules/users/signup.html',
		controller:'signupController'
	}).state('logout',{
		url:"/logout",
		template:"<h3>Logging out...</h3>",
		controller:'logoutController'
	});

		$urlRouterProvider.otherwise('/login');
	// if(!window.sessionStorage['userInfo']){
	// }else{
	// 	$urlRouterProvider.otherwise("/dashboard");
	// }
}]);

myApp.controller('loginController', ['$scope','userServices','$location','$rootScope', function($scope,userServices,$location,$rootScope){
	
	$scope.login = {
		"email":"myemail@abc.com",
		"password":"mypassword"
	};

	$scope.doLogin = function(){
	};

}])