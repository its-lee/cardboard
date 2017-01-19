angular.module('cardboard').service('cardboardService', ['$http', function ($http) {
	
	// private:
	
	function bodyData(method, path, data, cb)
	{
		return $http({
			method: method,
			url: path,
			data: data,
			headers: {
				"Content-Type": "application/json"
			}
		}).then(
		function(response) { cb(null, response); },
		function(response) { cb("error", response); });
	}
	
	function postData(path, data, cb) {
		return bodyData("POST", path, data, cb);
	}
	
	function putData(path, data, cb) {
		return bodyData("PUT", path, data, cb);
	}
	
	function deleteData(path, data, cb) {
		return bodyData("DELETE", path, data, cb);
	}
	
	function bodyData(method, path, data, cb)
	{
		return $http({
			method: method,
			url: path,
			data: data,
			headers: {
				"Content-Type": "application/json"
			}
		}).then(
		function(response) { cb(null, response); },
		function(response) { cb("error", response); });
	}
	
	function getData(path, params, cb)
	{
		return $http({
			method: "GET",
			url: path,
			params: params
		}).then(
		function(response) { cb(null, response); },
		function(response) { cb("error", response); });
	}
	
	// public:
	
	this.cards = [
		{
			id: 1,
			left: 10,
			top: 10,
			title: "card1",
			content: "card1-content"
		},
		{
			id: 2,
			left: 50,
			top: 10,
			title: "card2",
			content: "card2-content"
		},
		{
			id: 3,
			left: 40,
			top: 30,
			title: "card3",
			content: "card3-content"
		}
	];
	
	this.updateCard = function(params, cb) {
		return cb(null);
	}
	
	this.addCard = function(params, cb) {
		return cb(null);
	}
	
	this.deleteCard = function(params, cb) {
		return cb(null);
	}
	
}]);