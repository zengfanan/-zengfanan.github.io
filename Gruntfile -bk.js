module.exports = function(grunt) {
	require('time-grunt')(grunt); //Grunt处理任务进度条提示
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		compass: {// compass
            dist: {
                options: {
                    sassDir: 'css',
                    cssDir: 'assets/css',
                    imageDir: 'img/',
                    environment: 'production'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['**/*.scss', '!*/mod/**/*.scss'],
                        dest: 'assets/css',
                        ext: '.css'
                    }
                ]
            }
        },
		//复制文件到资源目录
		copy: {
			images: { 
				expand: true,
				cwd: 'img/',
				src: ['**', '!github.png'],
				dest: 'assets/images/',
				flatten: true,
				filter: 'isFile',
			},
			js: { 
				expand: true,
				cwd: 'js/libs/',
				src: ['**/*.js'],
				dest: 'assets/js/libs',
				flatten: true,
				filter: 'isFile',
			}
        },
        //监测文件修改
        watch: {
            compass: {
                files: ['css/**/*.scss'],
                tasks: ['compass']
            },
			copyimg: {
                files: ['img/**/*.*'],
                tasks: ['copy:images']
            }
		},
		// 提取依赖
        transport : {
               options : {
                    paths: ['.'],                                
               },
               application : {
                    options:{
                         idleading: "js",
                         relative:true
                    },
                    files:[{
                         expand:true,
                         cwd:'js/',
                         src:['**/*.js'],
                         dest:'.build/',
                         filter: 'isFile',
                         nonull: true,
                         ext : '.js'
                    }]
               }
          },
          concat : {
               main : {
                    options : {
                         paths: ['.'],
                         include: 'relative'
                    },
                    files: [{
                         expand: true,
                         cwd: '.build/',
                         src: ['**/*.js'],
                         dest: 'assets/js',
                         ext: '.js'
                    }]
               }
          },
          uglify : {
               main : {
                    options: {
                         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author %> */\n'，
                    },
                    files: [{
                         expand: true,
                         cwd: "assets/js/",
                         src: ["**/*.js", '!**/*-debug.js'],
                         dest: 'assets/js/min/',
                         ext: '.js'
                    }]
               }
          },
          clean : {
               build : ['.build'], //清除.build文件
          }

	});


	//输出进度日志
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + '文件: ' + filepath + ' 变动状态: ' + action);
    });

	
    // 所依赖的组件 
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	
	
	
    //grunt.registerTask('default', ['compass','copy:images','watch']);
   grunt.registerTask('default', ['copy:js','transport', 'concat','clean']);
	
	
}