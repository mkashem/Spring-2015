angular.module('userService', [])

.factory('User', function ($http) {
	var userFactory = {};

	userFactory.all = function () {
		return $http.get('https://wvup-gradebook.herokuapp.com/api/users/');
	};

	userFactory.get = function (id) {
		return $http.get('https://wvup-gradebook.herokuapp.com/api/users/' + id);
	};

	userFactory.create = function(data) {
		return $http.post('https://wvup-gradebook.herokuapp.com/api/users' + data);
	};

	userFactory.update = function (id, data) {
		return $http.put('https://wvup-gradebook.herokuapp.com/api/users/' + id, data);
	};

	userFactory.delete = function (id) {
		return $http.delete('https://wvup-gradebook.herokuapp.com/api/users' + id);
	}

	return userFactory;
});