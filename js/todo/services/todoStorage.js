/* global gTodo */
'use strict';

gTodo.factory('todoStorage', function() {

	var LOCAL_STORAGE_KEY = "sn-todomvc-angular";

	return {
		retrieveEntries : function() {
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
		},

		storeEntries : function(entries) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
		}
	}

});