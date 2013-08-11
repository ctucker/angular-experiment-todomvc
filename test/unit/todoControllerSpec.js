/* global describe, it, expect */
'use strict';

describe('TodoController', function() {

	var scope, ctrl;

	// Configure the injector with our root app module
	beforeEach(module('todo'));

	// Construct a controller with a self-created scope to interact with in tests
	beforeEach(inject(function($controller, $rootScope) {

		// Build a new, root-level scope that we can hold a handle to for testing purposes
		scope = $rootScope.$new();

		// Build a controller using the injected $controller service using our TodoController passing in our
		// hand-crafted scope
		ctrl = $controller('TodoController', { $scope: scope });
	}));


	describe('empty todo list', function () {

		it('should initially be empty', function() {
			// Verify that the scope's todo list is empty to start with
			expect(scope.todo.entries.length).toBe(0);
		});

		it('should have a single entry after one add', function() {
			var entry;

			scope.todo.newTodo = 'first todo entry';
			scope.addTodo();

			expect(scope.todo.entries.length).toBe(1);
			entry = scope.todo.entries[0];
			expect(entry.completed).toBe(false);
			expect(entry.title).toBe('first todo entry');
		});

		it('should clear the entry field after creating a new entry', function () {
			scope.todo.newTodo = 'todo entry';
			scope.addTodo();

			expect(scope.todo.newTodo).toBe(null);
		});

	});

});
