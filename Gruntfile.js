module.exports = function(grunt) {
	require('time-grunt')(grunt); //Grunt处理任务进度条提示
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		compass: {// compass
            dist: {
                options: {
                    sassDir: 'style/',
                    cssDir: 'dist/css',
					//environment: 'production'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'style',
                        src: ['**/*.scss'],
                        dest: 'dist/css',
                        ext: '.css'
                    }
                ]
            }
        },
		cssmin: {
			options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author %> */'
             },
			target: {			
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: ['**/*.css', '!**/*.min.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},
		//复制图片到资源目录
		copy: {
			images: { 
				expand: true,
				cwd: 'images/',
				src: ['**', '!github.png'],
				dest: 'dist/images/',
				flatten: true,
				filter: 'isFile',
			},
			jslibs: { 
				expand: true,
				cwd: 'script/libs',
				src: ['**'],
				dest: 'dist/js/libs/',
				flatten: true,
				filter: 'isFile',
			}
        },
        //监测文件修改
        watch: {
            compass: {
                files: ['style/**/*.scss'],
                tasks: ['compass']
            },
			cssmin: {
                files: ['dist/**/*.css'],
                tasks: ['cssmin']
            },
			copyimg: {
                files: ['images/**/*.*'],
                tasks: ['copy:images']
            },
			jsedit: {
                files: ['script/**/*.*'],
                tasks: ['transport', 'concat','uglify','clean']
            }
		},
        //提取依赖
		transport: {
            mod: {
                options: {
                    format: 'dist/js/{{filename}}' // 模块的id格式,用于合并后的路径
                },
                files: [{
					//expand:true,
                    cwd: 'script/js', // 需要提取依赖文件的相对路径
                    src: ['**/*.js'], // 需要提取依赖的文件
                    dest: '.build/' // 提取后存放的临时文件夹
                }]
            }
        },
        // 合并
        concat: {
            mod: {
                options: {
                    include: 'all'
                },
                files: [{
                    expand: true,
                    cwd: '.build/', // 需要合并的文件夹路径
                    src: ['**/*.js'], // 需要合并的文件
                    dest: 'dist/js/', // 合并后存放的路径
                    ext: '.js' // 合并后的扩展名
                }]
            }
        },
        // 压缩
        uglify: {
            mod: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author %> */\n'
				},
                files: [{
                    expand: true,
                    cwd: 'dist/js', // 需要压缩的文件夹路径
					src: ['**/*.js', '!**/*-debug.js'],// 需要压缩的文件
                    dest: 'dist/js', // 压缩后存放的路径
                    ext: '.js' // 压缩后的扩展名
                }]
            }
        },
        // 清除临时文件
        clean: {
            mod: ['.build'] // 需要清除的文件夹名称
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

	
	
	
    grunt.registerTask('default', ['copy','compass','transport', 'concat','uglify','clean','watch']);
	grunt.registerTask('jsdo', ['transport', 'concat','uglify','clean','watch']); 
	grunt.registerTask('cssdo', ['compass','cssmin','watch']); 
	
	
}