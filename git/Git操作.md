# Git操作

```
从文件夹新建git
git init
将文件夹下面的所有文件提交
git add .
写入本次提交的日志信息
git commit -m 'xxx'
设置提交到GitHub的url
git remote add origin https://xxx
提交
git push -u origin master
```

设置同时提交两个仓库

```
进入	.git 目录下的config打开文件
在文件里面的[remote "origin"]
下面添加一个url：设置为自己的另一个仓库的url地址就可以在提交的时候提交两个了


或者直接使用
git remote set-url --add origin https://xxx
也是可以的
```

![image-20210806111127594](Git操作.assets\image-20210806111127594.png)





其他是一些以前的使用

```
git reflog

git checkout front_end

git reflog

git status

git add scientfic_research_management/ 

git commit -m "备注" scientfic_research_management/ 

git push origin front_end

git reflog

git checkout master

git reflog

git merge front_end

git reflog




git pull origin front_end



新建并拉取
git init

#选择分支
git branch
git branch front_end

git remote add origin https://xxx

git pull origin front_end
```

