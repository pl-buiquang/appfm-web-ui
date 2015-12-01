module.exports = function(grunt) {

  grunt.initConfig({
    // read the package definition of the project
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {

        base : {
          src: [
                'src/main.js',
                'src/**/*.js',
               ],
          dest: 'build/<%= pkg.name %>.js'
        },

      },
      
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        base: {
         files: {
            'build/<%= pkg.name %>.min.js': ['<%= concat.base.dest %>']
          }
        },
      },
      
      copy: {
        css: {
          files: [
            {expand: true, cwd: '', src: ['style/**'], dest: 'build/'}, 
          ]
        },
      },
      
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('build_all',[
                                  'concat:base','uglify:base','copy:css',
                                  ]);
  
};
