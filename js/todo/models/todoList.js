/* global gTodo */
'use strict';

gTodo.factory("todoList", function(filterFilter) {
	// Create our core model, initially with no entries
	return {
		entries: [],
		remaining : 0,

		addTodo: function(newTodo) {
			var title = newTodo.trim();
			if (title.length == 0) {
				return; // Don't add an empty entry
			}

			this.entries.push({
				title: title,
				completed: false
			});
		},

		destroyTodo: function (entry) {
			var indexOfEntry = this.entries.indexOf(entry);
			if (indexOfEntry >= 0) {
				this.entries.splice(indexOfEntry, 1);
			}
		},

		recalculateRemaining: function() {
			this.remaining = filterFilter(this.entries, { completed : false }).length
		},

		completedCount: function() {
			return this.entries.length - this.remaining;
		},

		clearCompleted : function() {
			this.entries = filterFilter(this.entries, { completed : false});
		}
	};
});