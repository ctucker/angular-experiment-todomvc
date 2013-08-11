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

	describe('populated todo list', function () {
		var first = { title: 'First', completed: false },
			second = { title: 'Second', completed: false },
			third = { title: 'Third', completed: false };


		beforeEach(function() {
			scope.todo.entries = [first, second, third];
		});

		describe('removing an entry', function () {
			it('should remove an entry from the start of the list', function() {
				scope.destroyTodo(first);

				expect(scope.todo.entries.length).toBe(2);
				expect(scope.todo.entries.indexOf(first)).toBe(-1);
			});

			it('should remove an entry from the middle of the list', function() {
				scope.destroyTodo(second);

				expect(scope.todo.entries.length).toBe(2);
				expect(scope.todo.entries.indexOf(second)).toBe(-1);
			});

			it('should remove an entry from the end of the list', function() {
				scope.destroyTodo(third);

				expect(scope.todo.entries.length).toBe(2);
				expect(scope.todo.entries.indexOf(third)).toBe(-1);
			});

			it('should remove all three entries', function() {
				scope.destroyTodo(first);
				scope.destroyTodo(second);
				scope.destroyTodo(third);

				expect(scope.todo.entries.length).toBe(0);
			});

			it('should silently ignore removal of non-existent entry', function() {
				scope.destroyTodo({title : 'Nonesuch', completed: false});

				expect(scope.todo.entries.length).toBe(3);
			})
		});

		describe('filtering the todos', function() {

			var completed = { title: 'Completed', completed: true };

			beforeEach(function() {
				scope.todo.entries.push(completed);
			});

			beforeEach(inject(function($location) {
				scope.location = $location;
			}));

			it('should have an initial filter of all', function() {
				expect(scope.statusFilter).toBe(null);
			});

			it('should default the initial path to /', function() {
				expect(scope.location.path()).toEqual('/');
			});

			it('should set the filter to not-completed when path is /active', function() {
				scope.location.path("/active");

				scope.$apply();

				expect(scope.statusFilter).toEqual({ completed: false });
			});

			it('should set the filter to completed when path is /completed', function() {
				scope.location.path("/completed");

				scope.$apply();

				expect(scope.statusFilter).toEqual({ completed: true });
			});

			it('should reset the filter to all when path is /', function() {
				scope.location.path("/completed");
				scope.$apply();

				scope.location.path("/");
				scope.$apply();

				expect(scope.statusFilter).toEqual(null);
			});


		});
	});

	describe('has content check', function() {
		it('should indicate no content when there are no entries', function () {
			expect(scope.hasEntries()).toBe(false);
		});

		it('should indicate content when there is one entry', function () {
			scope.todo.newTodo = "new todo";
			scope.addTodo();
			expect(scope.hasEntries()).toBe(true);
		});
	});

});
