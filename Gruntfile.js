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
        ]
      }
    },
    concat: {
      dist: {
        src: [ 'src/*.js' ],
        dest: 'public/js/app.js'
      }
    },
    watch: {
      project: {
        files: ['public/**/*.js', 'public/**/*.html', 'public/**/*.json'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-package-modules');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['packageModules', 'concat', 'copy', 'connect', 'watch']);

};
