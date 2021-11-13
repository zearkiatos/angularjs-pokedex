module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'public/'
        }
      }
    },
    packageModules: {
      dist: {
        src: 'package.json',
        dest: 'public/.tmp'
      },
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/assets/', src: ['**'], dest: 'public/assets/'},
          { expand: true, cwd: 'src/css/', src: ['**'], dest: 'public/css/'},
          { expand: true, cwd: 'src/fonts', src: ['**'], dest: 'public/fonts'},
          { expand: true, cwd: 'src/partials', src: ['**'], dest: 'public/partials'},
          { expand: true, cwd: 'src/views', src: ['**'], dest: 'public/views'},
          { expand: true, cwd: 'src/db/mocks', src: ['**'], dest: 'public/db/mocks'}
        ]
      }
    },
    concat: {
      dist: {
        src: [ 'src/*.js' ],
        dest: 'public/js/app.js'
      },
      controllers: {
        src: ['src/controllers/*.js'],
        dest: 'public/js/controllers.js'
      },
      filters: {
        src: ['src/filters/*.js'],
        dest: 'public/js/filters.js'
      },
      directives: {
        src: ['src/directives/*.js'],
        dest: 'public/js/directives.js'
      },
      services: {
        src: ['src/services/*.js'],
        dest: 'public/js/services.js'
      }
    },
    watch: {
      project: {
        files: ['public/**/*.js', 'public/**/*.html', 'public/**/*.json'],
        options: {
          livereload: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-package-modules');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['packageModules', 'concat', 'copy', 'connect', 'watch']);

};
