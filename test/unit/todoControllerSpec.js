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

	function addTodoItem(name, isCompleted) {
		var addedEntry;
		var entries = scope.todoList.entries;
		scope.newTodo.title = name || "new todo";
		scope.addTodo();
		addedEntry = entries[entries.length - 1];
		if (isCompleted) {
			addedEntry.completed = true;
		}
		scope.$apply();
		return addedEntry;
	}

	describe('starting with empty list', function () {

		it('should initially be empty', function() {
			// Verify that the scope's todo list is empty to start with
			expect(scope.todoList.entries.length).toBe(0);
		});

		it('should have a single entry after one add', function() {
			var entry;

			addTodoItem('first todo entry');

			expect(scope.todoList.entries.length).toBe(1);
			entry = scope.todoList.entries[0];
			expect(entry.completed).toBe(false);
			expect(entry.title).toBe('first todo entry');
		});

		it('should clear the entry field after creating a new entry', function () {
			addTodoItem('todo entry');
			expect(scope.newTodo).toEqual({});
		});

		it('should trim whitespace from around the entry', function() {
			addTodoItem("  blank edges  ");
			expect(scope.todoList.entries[0].title).toEqual("blank edges");
		});

		it('should not add a blank entry', function() {
			addTodoItem("   "); // empty entry
			expect(scope.todoList.entries.length).toEqual(0);
		});

	});

	describe('starting with populated list', function () {
		var first, second, third;

		beforeEach(function() {
			first = addTodoItem('First');
			second = addTodoItem('Second');
			third = addTodoItem('Third');
		});

		describe('removing an entry', function () {
			it('should remove an entry from the start of the list', function() {
				scope.destroyTodo(first);

				expect(scope.todoList.entries.length).toBe(2);
				expect(scope.todoList.entries.indexOf(first)).toBe(-1);
			});

			it('should remove an entry from the middle of the list', function() {
				scope.destroyTodo(second);

				expect(scope.todoList.entries.length).toBe(2);
				expect(scope.todoList.entries.indexOf(second)).toBe(-1);
			});

			it('should remove an entry from the end of the list', function() {
				scope.destroyTodo(third);

				expect(scope.todoList.entries.length).toBe(2);
				expect(scope.todoList.entries.indexOf(third)).toBe(-1);
			});

			it('should remove all three entries', function() {
				scope.destroyTodo(first);
				scope.destroyTodo(second);
				scope.destroyTodo(third);

				expect(scope.todoList.entries.length).toBe(0);
			});

			it('should silently ignore removal of non-existent entry', function() {
				scope.destroyTodo({title : 'Nonesuch', completed: false});

				expect(scope.todoList.entries.length).toBe(3);
			})
		});

		describe('filtering the todos', function() {

			var completed = { title: 'Completed', completed: true };

			beforeEach(function() {
				addTodoItem('Completed', true);
				scope.todoList.entries.push(completed);
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

		describe('removing completed items', function() {

			it('should not change the entries list if no items are completed', function() {
				var entryCount = scope.todoList.entries.length;
				scope.clearCompleted();
				expect(scope.todoList.entries.length).toEqual(entryCount);
			});

			it('should remove only a completed entry', function() {
				var completedEntry = addTodoItem("completed", true);
				expect(scope.todoList.entries).toContain(completedEntry);

				scope.clearCompleted();
				expect(scope.todoList.entries).not.toContain(completedEntry)
			});

			it('should remove multiple completed entries', function() {
				var entry1 = addTodoItem("entry1", true),
					entry2 = addTodoItem("entry2", true);
				expect(scope.todoList.entries).toContain(entry1);
				expect(scope.todoList.entries).toContain(entry2);

				scope.clearCompleted();
				expect(scope.todoList.entries).not.toContain(entry1);
				expect(scope.todoList.entries).not.toContain(entry2);
			});

			it('should have correct count of completed entries', function() {
				var entry1 = addTodoItem("entry1", true),
					entry2 = addTodoItem("entry2", true);
				expect(scope.completedCount()).toEqual(2);
			});

			it('should indicate no completed entries when there are no complete entries', function() {
				expect(scope.hasCompletedEntries()).toBe(false);
			});

			it('should indicate there are completed entries when there are complete entries', function() {
				addTodoItem("Complete", true);
				expect(scope.hasCompletedEntries()).toBe(true);
			});
		});
	});

	describe('has content check', function() {
		it('should indicate no content when there are no entries', function () {
			expect(scope.hasEntries()).toBe(false);
		});

		it('should indicate content when there is one entry', function () {
			addTodoItem();
			expect(scope.hasEntries()).toBe(true);
		});
	});

	describe('counts', function() {

		it('should calculate 0 items remaining when there are no items in the list', function() {
			expect(scope.todoList.remaining).toEqual(0);
		});

		it('should recalculate items remaining after adding an item', function() {
			addTodoItem();
			expect(scope.todoList.remaining).toEqual(1);
		});

		it('should recalculate items remaining after removing an item', function() {
			var entry = addTodoItem();
			scope.destroyTodo(entry);
			scope.$apply();
			expect(scope.todoList.remaining).toEqual(0);
		});

		it('should recalculate items remaining after marking an entry as complete', function() {
			var entry = addTodoItem();
			entry.completed = true;
			scope.$apply();
			expect(scope.todoList.remaining).toEqual(0);
		});
	});

});
