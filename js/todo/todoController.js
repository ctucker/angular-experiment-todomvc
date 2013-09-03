/* global gTodo */
'use strict';

gTodo.controller('TodoController', function($scope, $location, filterFilter) {

	// Create our core model, initially with no entries
	var todoList = {
		entries: [],
		remaining : 0,

		addTodo: function(newTodo) {
			var title = newTodo.trim();
			if (title.length == 0) {
				return; // Don't add an empty entry
			}

			this.entries.push({
				title: title,
				completed: false
			});
		},

		destroyTodo: function (entry) {
			var indexOfEntry = this.entries.indexOf(entry);
			if (indexOfEntry >= 0) {
				this.entries.splice(indexOfEntry, 1);
			}
		},

		recalculateRemaining: function() {
			this.remaining = filterFilter(this.entries, { completed : false }).length
		},

		completedCount: function() {
			return this.entries.length - this.remaining;
		},

		clearCompleted : function() {
			this.entries = filterFilter(this.entries, { completed : false});
		}
	};

	$scope.newTodo = {};
	$scope.todoList = todoList;

	$scope.statusFilter = null;
	$scope.location = $location;
	if ($scope.location.path() === '' ) {
		$scope.location.path('/');
	}

	$scope.$watch('todoList', function() {
		$scope.todoList.recalculateRemaining();
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


});