/* global gTodo */
'use strict';

gTodo.controller('TodoController', function($scope) {

	// Create our core model, initially with no entries
	var todoModel = {
		entries: [],
		newTodo: null, // A new todo will be a fresh entry

		addTodo: function () {
			this.entries.push({
				title: this.newTodo,
				completed: false
			});
			this.newTodo = null;
		},

		destroyTodo: function (entry) {
			var indexOfEntry = this.entries.indexOf(entry);
			if (indexOfEntry >= 0) {
				this.entries.splice(indexOfEntry, 1);
			}
		}
	};

	$scope.todo = todoModel;

	$scope.addTodo = function() {
		todoModel.addTodo();
	};

	$scope.destroyTodo = function(entry) {
		todoModel.destroyTodo(entry);
	};

	$scope.hasEntries = function() {
		return todoModel.entries.length > 0;
	};


});