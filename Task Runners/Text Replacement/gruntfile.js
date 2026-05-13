module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    replace: {
      main: {
        options: {
          patterns: [
            {
              match: /ninjacoding\.com/g,
              replacement: 'codingninjas.com'
            }
          ]
        },
        files: [
          {
            src: 'src/index.html',
            dest: 'build/index.html'
          }
        ]
      }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-replace');

  // Register the default task
  grunt.registerTask('default', ['replace']);
};