module.exports = function( grunt ) {

	grunt.initConfig( {
		compass: {
			dev: {
				options: {
					sassDir: "source/styles/scss",
					cssDir: "source/styles/css",
					environment: "development",
					outputStyle: "expanded",
					noLineComments: true,
		      beautify: true, 
					force: true
				}
			},

			build: {
				options: {
					sassDir: "source/styles/scss",
					cssDir: "build/styles/css",
					environment: "development",
					outputStyle: "expanded",
					noLineComments: true,
		    		beautify: true, 
					force: true
				}
			}
		},

		watch: {
			dev: {
				files: [ "source/styles/scss/**" ],
				tasks: "compass:dev",
				options: {
					debounceDelay: 100
				}
			}
		},

		requirejs: {
			compile: {
				options: {

					baseUrl: "source/scripts",
					name: "main",
					out: "build/scripts/main.js",
					preserveLicenseComments: false,
					include: "requireJS",
		    		beautify: true, 

					paths: {
						requireJS: "libs/require/require",
						dat: "libs/dat",
						text: "libs/require/plugin.text"
					}
				}

			}
		},

		targethtml: {
			build: {
				files: {
					"build/index.html": "source/index.html"
				}
			}
		},

		  uglify: {
		    options: {
		      mangle: false,
		      beautify: true, 
		    },
		    my_target: {
		      files: {
		        'build/scripts': ['source/scripts/main.js']
		      }
		    }
		  }

	} );

	grunt.loadNpmTasks( "grunt-contrib-compass" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
	grunt.loadNpmTasks( "grunt-targethtml" );

	grunt.registerTask( "build", [ "compass:build", "requirejs", "targethtml:build" ] );
}