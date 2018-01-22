module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass : {
      dist : {
        options : {
          sassDir : 'src/styles/',
          cssDir : 'docs',
          environment : 'production',
//          debugInfo : true,
//          outputStyle : 'expanded' /* compressed */
        }
      }
    },

    watch : {
      css : {
        files : ['src/styles/*.scss'],
        tasks : ['compass']
      }/*,
      js : {
        files : ['src/*.js'],
        tasks : ['uglify']
      }*/
    }
  });

//  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['compass']);
};
