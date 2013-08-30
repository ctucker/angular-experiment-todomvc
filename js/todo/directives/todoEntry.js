/* global gTodo */
'use strict';

gTodo.directive('todoEntry', function() {

	return {
		restrict: 'E',
		templateUrl: "/js/todo/directives/todoEntry.html"
	};
});
