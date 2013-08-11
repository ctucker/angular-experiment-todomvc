/* global GTodo */
'use strict';

GTodo.controller('TodoController', function($scope) {

	// Create our core model, initially with no entries
	$scope.todo = {
		entries : [],
		newTodo : null // A new todo will be a fresh entry
	};

	$scope.addTodo = function() {
		var todoModel = $scope.todo;

		todoModel.entries.push({
			title : todoModel.newTodo,
			completed: false
		});
		todoModel.newTodo = null;
	};

	$scope.destroyTodo = function(entry) {
		$scope.todo.entries.splice($scope.todo.entries.indexOf(entry), 1);
	};

});