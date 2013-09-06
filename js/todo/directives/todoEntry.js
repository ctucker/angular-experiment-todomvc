/* global gTodo */
'use strict';

gTodo.directive('todoEntry', function() {

	return {
		restrict: 'E',
		scope : {
			entry : '=',
			destroy : '&',
			update : '&',
			edit : '&'
		},
		templateUrl: "tpl/todoEntry.html"
	};
});
