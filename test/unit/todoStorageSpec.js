/* global describe, it, expect */
'use strict';

describe('TodoStorage', function() {

	var todoLocalStore;

	beforeEach(module('todo'));

	beforeEach(inject(function(todoStorage) {
		todoStorage.storeEntries([]);
		todoLocalStore = todoStorage;
	}));

	it('should start with an empty list of entries', function() {
		var entries = todoLocalStore.retrieveEntries();
		expect(entries).toEqual([]);
	});

	it('should record entries and retrieve them', function() {
		var entries = [1, 2, 3];
		todoLocalStore.storeEntries(entries);
		expect(todoLocalStore.retrieveEntries()).toEqual(entries);
	});

});

