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

	});

});
