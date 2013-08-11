/* global GTodo */
'use strict';

GTodo.controller('TodoController', function($scope) {

	// Create our core model, initially with no entries
	$scope.todo = {
		entries : []
	};

});