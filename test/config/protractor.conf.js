exports.config = {
	// Connect directly to Chrome & FF so we don't have to use selenium
	directConnect: true,

	// Path to test relative to this file
	specs: ['../e2e/**/*.js']
};