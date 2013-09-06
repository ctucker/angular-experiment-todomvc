/* global gTodo */
'use strict';

gTodo.controller('TodoController', function($scope, $location, todoStorage, todoList) {

	todoList.entries = todoStorage.retrieveEntries();
	$scope.todoList = todoList;
	$scope.currentlyEditing = null;

	$scope.newTodo = {
		title : ''
	};

	$scope.statusFilter = null;
	$scope.location = $location;

	if ($scope.location.path() === '' ) {
		$scope.location.path('/');
	}

	$scope.$watch('todoList', function() {
		$scope.todoList.recalculateRemaining();
		todoStorage.storeEntries(todoList.entries);
	}, true);

	$scope.$watch('location.path()', function(path) {
		if (path === '/active') {
			$scope.statusFilter = { completed : false };
		}
		else if (path === '/completed') {
			$scope.statusFilter = { completed : true };
		}
		else {
			$scope.statusFilter = null;
		}
	});

	$scope.addTodo = function() {
		todoList.addTodo($scope.newTodo.title);
		$scope.newTodo = {};
	};

	$scope.destroyTodo = function(entry) {
		todoList.destroyTodo(entry);
	};

	$scope.hasEntries = function() {
		return todoList.entries.length > 0;
	};

	$scope.clearCompleted = function() {
		todoList.clearCompleted();
	};

	$scope.hasCompletedEntries = function() {
		return todoList.completedCount() > 0;
	};

	$scope.completedCount = function() {
		return todoList.completedCount();
	};

	$scope.editTodo = function(entry) {
		$scope.currentlyEditing = entry;
	}

	$scope.submitTodo = function(entry) {
		$scope.currentlyEditing = null
	}

});