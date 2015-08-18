## 项目介绍

git 没有跟踪空目录，所以需要跟踪那么就需要添加文件，方法如下:

find . -type d -empty -exec touch {}/.gitignore \;给所有的子空目录都添加gitignore文件