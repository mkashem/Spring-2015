var gradebookApp = angular.module('gradebook', ['ui.router']);

gradebookApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) { 
	$scope.viewType = "Semester";
	
	var donut = Morris.Donut({
		element: 'currentBreakdown',
		data: [
			{label: "CS 329", value: 12},
			{label: "CS 330", value: 23},
			{label: "CS 331", value: 11},
			{label: "CS 332", value: 9},
			{label: "CS 333", value: 4}
		],
		colors: [
			'#ff865c',
			'#ffd777',
			'#43b1a9',
			'#68dff0',
			'#797979'
		],
		resize: true
	});
}]);

gradebookApp.controller('NotifyController', ['$scope', '$http', function ($scope, $http) {
	$http.get("././notifications.json").success (function(data){
		$scope.notifications = data;
		console.log(data);
		console.log("Notifications retrieved");
	})
	.error (function(){
		console.log("Notifications not retrieved");
	});
}]);

gradebookApp.controller('CourseController', ['$scope', '$http', function ($scope, $http) {
	$scope.viewType = "Courses";
	$http.get("").success (function(data){
		$scope.courseData = data;
		console.log(data);
		console.log("Courses retrieved");
	})
	.error (function(){
		console.log("Courses not retrieved");
	});
}]);

gradebookApp.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('homeState', {
			url: "",
			templateUrl: "././app/views/home.html",
			controller: 'HomeController'
		})

		.state('courseState', {
			url: "/courses",
			templateUrl: "././app/views/courses/index.html",
			controller: 'CourseController as courses'
		})

		.state('courseState.list', {
			url: "courses/list",
			templateUrl: "././partials/courses.list.html",
			controller: function($scope) {
				$scope.courses = gradebookApp.factory;
			}
		});
});