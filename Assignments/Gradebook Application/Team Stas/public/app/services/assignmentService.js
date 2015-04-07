angular.module('assignmentService', [])

.factory('Assignment', function ($http) {
	var assignmentFactory = {};

	assignmentFactory.all = function () {
		return $http.get('/api/assignments/');
	};

	assignmentFactory.create = function (data, id) {
		return $http.post('/api/assignments/create/' + id, data);
	};

	assignmentFactory.allForClass = function (id) {
		return $http.get('/api/assignments/view/' + id);
	};

	assignmentFactory.delete = function (id) {
		return $http.delete('/api/assignments/' + id);
	};

	return assignmentFactory;
})