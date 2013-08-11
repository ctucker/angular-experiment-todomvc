module.exports = function(config) {
	config.set({

		basePath: '../',

		frameworks: ["jasmine"],

		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'js/**/*.js',
			'test/unit/**/*.js'
		],

		autoWatch: true,

		browsers: ['Chrome'],

		reporters: ['progress', 'osx'],

		logLevel: config.LOG_DISABLE,

		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-osx-reporter'
		]
	});
};

