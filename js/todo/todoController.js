/* global gTodo */
'use strict';

gTodo.controller('TodoController', function($scope, $location, filterFilter) {

	// Create our core model, initially with no entries
	var todoModel = {
		entries: [],
		newTodo: '', // A new todo will be a fresh entry
		remaining : 0,

		addTodo: function() {
			var title = this.newTodo.trim();
			if (title.length == 0) {
				return; // Don't add an empty entry
			}

			this.entries.push({
				title: title,
				completed: false
			});
			this.newTodo = '';
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

	$scope.todo = todoModel;
	$scope.statusFilter = null;
	$scope.location = $location;
	if ($scope.location.path() === '' ) {
		$scope.location.path('/');
	}

	$scope.$watch('todo', function() {
		$scope.todo.recalculateRemaining();
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
		todoModel.addTodo();
	};

	$scope.destroyTodo = function(entry) {
		todoModel.destroyTodo(entry);
	};

	$scope.hasEntries = function() {
		return todoModel.entries.length > 0;
	};

	$scope.clearCompleted = function() {
		todoModel.clearCompleted();
	};

	$scope.hasCompletedEntries = function() {
		return todoModel.completedCount() > 0;
	};

	$scope.completedCount = function() {
		return todoModel.completedCount();
	};


});