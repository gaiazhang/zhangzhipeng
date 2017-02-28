const app = require('koa')();
const webpack = require('webpack');
const path = require('path');
const serve = require('koa-static')
//const proxy = require('koa-proxy');
const devMiddleware = require("koa-webpack-dev-middleware");
const hotMiddleware = require("koa-webpack-hot-middleware");
const chalk = require('chalk')
const devConfig = require ('./webpack.config')
    devConfig.entry.app.unshift('webpack-hot-middleware/client?reload=true');//这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。

const router = require('koa-frouter')
const bodyParser = require('koa-bodyparser')

const config = require('config')

const ip = config.get('ip')
const port = config.get('port')


var debug = process.env.NODE_ENV !== 'production';
// 开发环境和生产环境对应不同的目录
var viewDir = debug ? 'src' : 'dist';

console.log( process.env.NODE_ENV,'process.env.NODE_ENV')


if (debug) {
  const compile = webpack(devConfig)
  //热加载
  app.use(devMiddleware(compile,{
         noInfo: false,
         quiet: false,
         publicPath: devConfig.output.publicPath,//网站访问路径
         stats: {colors: true}
  }));
  app.use(hotMiddleware(compile));

}else {
  console.log(chalk.red('忽略-上方 - [WARNING] -警告 & 没什么鸟用！产品环境服务器直接访问的是dist里面的真实地址并么有走webapck.config文件，所以有警告！如有好的方法请告知本人E-mail：51216654@qq.com'))
}


//模拟数据
//app.use(jsonp());
app.use(bodyParser()) //post来传递表单，json数据，或者上传文件，在koa中是不容易获取的，通过koa-bodyparser解析之后，在koa中this.body就能直接获取到数据。

// 处理静态资源和入口文件
app.use(serve(path.resolve(__dirname, viewDir), {
    maxage: 0
}));
//直接挂载目录
app.use(router(app, './mock/api'))



app.listen(port, ip, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(
    chalk.magenta('Server'),
    chalk.magenta( debug ?  chalk.red('[开发版]'): '[产品版]',
      ' listening on : Koa 启动成功 ' + chalk.green.underline.bgRed.bold('http://' + ip + ':' + port) + ', Ctrl+C to stop')
  )
});