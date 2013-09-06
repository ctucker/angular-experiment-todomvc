/* global describe, it, expect */
'use strict';

describe('TodoEntry', function() {

	var scope, element;


	beforeEach(module('todo'));

	beforeEach(module('tpl/todoEntry.html'));

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.entry = { title : 'My title', completed : false };
		scope.editFn = jasmine.createSpy();
		scope.submitFn = jasmine.createSpy();
		scope.updateFn = jasmine.createSpy();
		scope.destroyFn = jasmine.createSpy();

		element = angular.element("<todo-entry entry='entry' edit='editFn()'></todo-entry>");

		$compile(element)(scope);
		scope.$digest();
	}));

	it('should show the entry title in a label', function() {
		var label = element.find('label');
		expect(label.text()).toEqual("My title");
	});

	it('should respond to a double click by calling the edit(entry) function', function() {
		var label = element.find('label');
		label.triggerHandler("dblclick");

		expect(scope.editFn).toHaveBeenCalled();
	});

});