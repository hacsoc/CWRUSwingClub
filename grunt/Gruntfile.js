/**
Please see JSHint documentation for more in depth descriptions of each setting
Please see CSSLint documentation for more in depth descriptions of each setting
**/

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    csslint: {
        options: {
            //Dissallow things like .foo, .bar, and then doing .foo.bar in css
            "adjoining-classes": false,
            //If true, warns because this is not supported in IE 6 and 7
            "box-sizing": true,
            //Prohibit things like width with box model
            "box-model": false,
            //Make sure all vendor prefixes are included if missing
            "compatible-vendor-prefixes":true,
            //Disallows displaying things like inline-block with a float, or table cell with margin
            "display-property-grouping": true,
            //Prohibits calls to same pictures more than once in css
            "duplicate-background-images": true,
            //Warns about duplicate named CSS with same styles
            "duplicate-properties": true,
            //Warns against empty properties
            "empty-rules": true,
            //Don't require fallback colors when using rgb hsl etc.
            "fallback-colors": false,
            //Warns if more than 10 floats are called in a file, implying use a grid system instead
            "float": true,
            //Warns if more than five font-faces are called
            "font-faces": true,
            //Allows for more than font-size declerations
            "font-size": false,
            //Warns against forgetting to use old and new -webkit gradient
            "gradients": true,
            //ids are bad, don't use them. Setting this to true will throw warnings about ids
            "ids": true,
            //Disallow imports
            "import": true,
            //Allow use of important
            "important": false,
            //Make sure we are using valid CSS types
            "known-properties": true,
            //Will not warn against using outline:none 
            "outline-none": false,
            //Just look this one up for an explenation
            "overqualified-elements": false,
            //disallow qualified headings (eg .foo h3) for consistency
            "qualified-headings": true,
            //If margin top/right/left/down, or something similar, are all used at once, use shorthand
            "shorthand": true,
            //Prevents using the star property hack (*width) specific for IE
            "star-property-hack": true,
            //Negative text indents are bad, don't do it
            "text-indent": true,
            //Prevents underscore property hack
            "underscore-property-hack": true,
            //Headings should be consistent, and not uniqe
            "unique-headings": true,
            //Universal selectors are bad, don't use them
            "universal-selector": true,
            //Unqualified attriburtes are bad on performance, don't use them
            "unqualified-attributes": true,
            //Vendor prefixes should be included incase as a fall back
            "vendor-prefixes": true,
            //Zeros don't need units
            "zero-units":true

        },
        pages: {
            src: ["../Swing/DEV/Pages/**/*.css"]
        }
    },
    concat_css: {
        pages: {
            src: ["../Swing/DEV/Pages/**/*.css"],
            dest: "../build/css/pages.css"
        }
    },
    cssmin: {
        target: {
            files: {
              '../prod/css/pages.min.css': ['../build/css/pages.css']
            }
        }
    },
    jshint: {
    	options: {
    		/**Enforcing Options**/
    		//Always put curly braces around blocks (loops and conditionals)
    		curly: true,
    		//Check for '==='
    		eqeqeq: true,    		
    		//Prohibits use of immediate function invoactions without wrapping in parentheses
    		immed: true,
    		//#of indents
    		indent: 4,
    		//Prohibits use of variable before it was defined
    		latedef: true,
    		//Avoids the 'bad line breaking' error
    		laxbreak: true,
    		//Max errors allowed
    		maxerr: 50,
            //Complexity
            maxcomplexity: 6,
    		//Requires capitalize names of constructors
    		newcap: false,
    		//Prohibits the use of 'arguments.caller/callee'
    		noarg: true,
    		//Avoid allowing identifiers with underscore characters
    		nomen: true,
    		//Prohibits use of unary increment and decrement operators
    		plusplus: false,
    		//Supresses warnings about using [] when it can be expressed in dot notation.
    		sub: true,
    		//Prohibits the use of explicitly undeclared variables
    		undef: false,
    		//Warns when you define and never use a variable
    		unused: false,

    		/**Relaxing options**/
    		//Supress warnings about the use of assignments in cases were comparisons are expected
    		boss: true,
    		//Defins global variables exposed by browsers
    		browser: true,

    		//global variables that we shouldn't get yelled at for
    		//false considered
    		globals: {
    			jQuery: false,	
                angular: false,
    			"$": false
    		},
    		ignores: [
    			'**/*.html',
                'node_modules/*'
    		]
    	},
    	gruntfile: {
    		src: 'Gruntfile.js'
    	},
    	directives: {
    		src: ['../Swing/DEV/Angular/Directives/*.js']
    	}
    },
    concat: {
        ngDirectives: {
            src: ['../Swing/DEV/Angular/Directives/*.js'],
            dest: '../build/angular/directives/directives.js'
        },
    },
    uglify: {
        ngDirectives: {
            src: '<%= concat.ngDirectives.dest %>',
            dest: '../prod/angular/directives/directives.min.js'
        },
    },
    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: '../Swing/DEV/Photos/',
                src: ['**/*.{png,jpg,gif}'],
                dest: '../prod/photos/'
            }]
        }
    },
    watch: {
    	gruntfile: {
    		files: '<%= jshint.gruntfile.src %>',
    		tasks: ['jshint:gruntfile']
    	},
    	directives: {
    		files: '<%= jshint.src.directives %>',
    		tasks: ['newer:jshint:src:directives']
    	},
        css: {
            files: '<%= csslint.pages.src %>',
            tasks: ['newer:csslint:pages', 'concat_css:pages', 'cssmin:pages']
        }
    }
});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'csslint', 'concat_css', 'cssmin']);

};
