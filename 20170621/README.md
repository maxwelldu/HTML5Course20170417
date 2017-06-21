##五子棋
- 数据结构：
  二维数组存储地图
- 核心算法：
  实现胜负判断，并给出赢棋提示
  思路一：从地图上面不断的查找各个方向的固定子的数量是否满5（不优雅）
  思路二：判断当前子对应8个方向，每两个方向的数量相加，和为5则赢
    判断一个方向上相同子的数量
      循环对相同的子计数（子的颜色相同，并且没有到达边界）
    判断一下每两个方向相同的子到达5则赢

- 游戏对象
- 棋盘对象
  属性：
    行数，列数，格间距，地图数组
  方法：
    init() {
      创建表格，添加到body上；循环创建tr(新建数组),循环创建td(把每一个td给加到数组当中);把td添加到tr中
    }

作业：游戏（可选的有飞行棋）

##几乎现在非常多流行的语言，都会有包管理这个东西
java maven
php composer
js  npm,yarn
centos yum

##npm - nodejs package manger, nodejs的包管理软件，可以用来帮助我们安装后面几乎90%的软件（库，框架，插件）
node npm npmjs.com
###使用步骤
- 下载nodejs(这个下载安装好之后，npm也就安装好了,安装好了之后桌面没有任何东西)
- 测试npm可用，打开git bash命令行，输入npm -v //能够显示版本号就说明安装好了(如果显示说command not found则说明没有安装成功)
- 安装好了还是提示命令找不到，打开环境变量的Path,在最后添加安装的nodejs的目录
- `npm config set loglevel=http`      //让安装软件的时候显示所有的HTTP请求
- 如果觉得npm安装比较慢，可以使用cnpm(淘宝的镜像), 避免因为网络原因安装失败
- npm 安装尝试安装一下bower, gulp(测试,可选)
- `npm i -g http-server localtunnel json-server`   安装一个软件包
- 打开你写好的网页目录，右击点击git bash，输入
  `http-server . -p 8000`
- 再打开一个新的窗口
- `lt --port 8000`
- http://www.jianshu.com/p/0db77f582c12
- http://h6.duchengjiu.top/shop/api_cat.php
- jsonview插件方便查看json格式的文本
- ajax获取数据并展示

作业（nodejs的安装)

##Lodash是js库，解决
使用npm安装lodash
- npm i -g lodash
