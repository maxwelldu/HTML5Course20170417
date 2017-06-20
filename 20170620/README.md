##git的实验
- 本地配置一下user.name和uesr.email
  git config --global user.name "xxx"
  git config --global user.email "xxx@xxx.com"
  git config --list //查看一下配置信息
- 访问http://www.github.com 注册github帐号，登录github, 到你的邮箱里面去验证一下
- 创建一个git的仓库(repository)
- 克隆到本机
  git clone 地址 github_game
  cd github_game
- 在项目里面新建一个文件, 用编辑器新建文件
- git add 文件名(或者.)
- git commit -m '描述信息'
- git push origin master
