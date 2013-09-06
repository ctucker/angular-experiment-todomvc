/* global describe, it, expect */
'use strict';

describe('TodoEntry', function() {


	beforeEach(module('todo'));

	beforeEach(module('tpl/todoEntry.html'));

	it('should show the entry title in a label', inject(function($rootScope, $compile) {
		var scope, element;
		scope = $rootScope.$new();
		scope.entry = { title : 'My title', completed : false };

		element = angular.element("<todo-entry entry='entry'></todo-entry>");
		$compile(element)(scope);
		scope.$digest();

		var label = element.find('label');

		expect(label.text()).toEqual("My title");

	}));

});