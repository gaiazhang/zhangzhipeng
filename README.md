- 启动本地开发服务器-开发环境

``` bash
$ npm start
```

### 编译-打包

``` bash
$ npm run build
```

### 模拟产品环境

``` bash
$ npm run release
```

按任务分工来分步讲解
按照开发的内容，我们把前端团队分为两个小组： “布局组” 和 “逻辑组”，每个小组有2种任务，一共4种任务。

布局组- 负责 contianer、component 部分

任务1： 静态布局 - 使用 HTML + CSS 静态布局

任务2： 动态布局 - 使用 JSX 语法对静态布局做动态渲染处理

逻辑组- 负责 action、reducer 部分

任务1： action 开发 - 制作 redux 流程的 action

任务2： reducer 开发 - 制作 redux 流程的 reducer

布局组要求对 HTML + CSS 布局比较熟悉，只需要会简单的 js 即可， 不需要完整地理解redux流程。

逻辑组要求对 js 比较熟悉，最好可以比较完整地理解redux流程， 但基本不需要涉及HTML + CSS布局工作。

接下来，先给出我们教程相关的 src 目录。这里大家可以先一扫而过，大概了解即可

src 源码文件夹 : 包含项目源码，我们基本都在这个文件夹下做开发

containers 容器文件夹 ：存放容器组件，比如 “苹果篮子”

components 组件文件夹 ：存放普通显示组件，比如 “苹果”

actions文件夹 ：存放可以发出的action

reducers文件夹 ：存放action的处理器reducers

services 服务文件夹 ：存放经过封装的服务，如 ajax服务 , 模拟数据服务

styles 样式文件夹 ：存放应用的样式，如css, scss

images 图片文件夹 : 存放图片资源

mock 开发接口文件夹 ： 存放开发接口文档

下面正式开始啦，先从布局组开始。