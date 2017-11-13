##  ES6-Lottery

![lottery](https://github.com/Artila/ES6-Lottery/blob/master/lottery-01.PNG)

#### 项目简介

这是一个11选5的彩票项目，大量使用ES6来实现项目功能，本项目主要功能：期号更新、倒计时、玩法切换、自主选号、随机选号、金额计算、奖金预测、开售状态等、



#### 技术栈

- ES6 ：在项目中大量应用了ES6的新特性，例如：let、const、箭头函数、Set、Map、Class、Promise等；
- Gulp：自动化地完成  javascript/html/css 等文件的测试、检查、合并、压缩、格式化、部署文件生成、浏览器自动刷新、并监听文件在改动后重复指定的步骤；
- Babel：广泛使用的转码器，可以将ES6代码转为ES5代码，从而支持现有的浏览器执行；
- Webpack：自动转换和打包需要处理的模块；
- Express：基本框架；
- mock.js：模拟后端数据，与前端实现数据对接。
- jQuery





#### ES6 的应用

- Class：所有的功能模块都是建立在类之上的，最后通过多重继承实现代码整合；
- Promise：使用Promise解决了前后端通信的回调操作，更加简洁易懂；
- Set、Map：使用Set解决集合数据不能重复的问题，奖号和选号集合，使用Map存储玩法说明，读写清晰；
- rest 参数：默认值在选号操作和购物车增删方面表现很强的优势；
- 对象代理：对彩种的核心数据状态进行保护不能写操作。




#### 安装

```
# 进入你放置项目的文件夹，然后克隆项目到本地
$ git clone https://github.com/Artila/ES6-Lottery.git

# 启动前还需要安装一些插件
$ npm install gulp
$ cd server
$ npm install

# 不要忘了退出server文件夹，启动
$ gulp --watch

# 打开浏览器
$ http://localhost:3000
```

