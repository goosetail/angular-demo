module.exports = function(grunt) {

	var pkg = grunt.file.readJSON(__dirname + '/package.json');
	var swfFolder = '/' + pkg.version + '/swf/';

	// Project configuration.
	grunt.initConfig({
		pkg: pkg,

		html2js: {
			options: {
				base: 'core/client/',
				rename: function(name) {
					return '/' + name.replace('.jade', '.html');
				},
				jade: {
					doctype: 'html'
				}
			},
			app: {
				src: ['core/client/app/**/*.jade'],
				dest: 'core/.build/app/lib/angular-templates.js'
			}
		},

		uglify: {
			options: {
				beautify: false
			},
			app: {
				files: {
					'core/.build/app/gen.min.js': [
						'core/client/app/**/*.js',
						'!core/client/app/index.js',
						'!core/client/app/lib/**/*.js',
						'!core/client/app/**/*-spec.js'
					],
					'core/.build/app/lib.min.js': [
						'core/client/app/lib/**/*.js',
						'core/.build/app/lib/**/*.js'
					],
					'core/.build/app/index.min.js': [
						'core/client/app/index.js'
					]
				}
			}
		},

		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			app : {
				files: {
					'core/.build/app/gen.min.css': [
						'core/.build/app/**/*.css',
						'!core/.build/app/lib/**/*.css'
					],
					'core/.build/app/lib.min.css': [
						'core/.build/app/lib/**/*.css'
					]
				}
			}
		},

		copy: {
			app: {
				files: [
					{
						expand: true,
						cwd: 'core/client/app/lib',
						src: ['fonts/**'],
						dest: 'core/.build/<%= pkg.version %>/'
					},
					{
						expand: true,
						cwd: 'core/client',
						src: ['swf/**'],
						dest: 'core/.build/<%= pkg.version %>/'
					},
					{
						expand: true,
						cwd: 'core/client',
						src: ['**/*.css', 'images/**'],
						dest: 'core/.build/'
					}
				]
			}
		},

		stylus: {
			app: {
				files: [
					{
						expand: true,
						cwd: 'core/client',
						src: ['**/*.styl'],
						dest: 'core/.build',
						ext: '.css'
					}
				]
			}
		},

		concat: {
			js: {
				options: {
					separator: '',
					banner: '"use strict";\n/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					process: function(src) {
						return src.replace(/\/swf\//g, swfFolder);
					}
				},
				src: [
					'core/.build/app/lib.min.js',
					'core/.build/app/index.min.js',
					'core/.build/app/gen.min.js'
				],
				dest: 'core/.build/<%= pkg.version %>/js/app.min.js'
			},
			css: {
				options: {
					banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				src: [
					'core/.build/app/lib.min.css',
					'core/.build/app/gen.min.css'
				],
				dest: 'core/.build/<%= pkg.version %>/css/app.min.css'
			}
		},

		clean: {
			reset: {
				src: ['core/.build']
			},
			build: {
				src: [
					'core/.build/*',
					'!core/.build/<%= pkg.version %>/**',
					'!core/.build/images'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-html2js');

	// Default tasks
	grunt.registerTask('build', ['copy', 'html2js', 'stylus', 'cssmin', 'uglify', 'concat', 'clean:build']);
	grunt.registerTask('heroku:heroku-staging', ['build']);

};