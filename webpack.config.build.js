const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs'); 
const minify = require('html-minifier').minify;
module.exports = {
   entry: {
    app: ['./src/index.js'],
    vendor: ['react','react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/",//实际的cdn地址比如 http://www.XXX.com/
    filename: '[chunkhash:5].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      exclude:/node_modules/,
      include: path.join(__dirname, '.'),
      //loader: 'babel-loader?presets[]=react,presets[]=es2015'
      loader: 'babel-loader',//'bable' --是'bable-loader'的简写
      query:{
        presets:['es2015','react'],
        //plugins: ['import', [{ libraryName: "antd", style: 'css' }]]
      }
    },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[name]-[hash:8].[ext]'}
    ]
  },
   resolve: {//处理扩展名
     extensions: ['', '.js', '.jsx']
   },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    new HtmlWebpackPlugin({
        template :'./src/index.html',
         hash:true,    //为静态资源生成hash值
             minify:{    //压缩HTML文件
                 removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:false    //删除空白符与换行符
             }
        }),
    new webpack.optimize.UglifyJsPlugin({ //压缩代码
         comments: false,        //去掉注释
         compress: {
            warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
        }
    }),
    new webpack.DefinePlugin({  //当部署反应警告 消除
        'process.env': {
            //注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面
            NODE_ENV: '"production"'
        }
    }),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    new webpack.ProgressPlugin(function handler(percentage, msg) {//webpack编译过程插件
        if (percentage==0) {
            console.log('开始编译');
        }
        if (percentage==1) {
            console.log('结束编译');
            fs.readFile(__dirname + '/dist/index.html', 'utf-8', function(err, data) {
                if (err) {
                    throw new Error('读取编译译后的 HTML 文件失败...');
                }
                //const newData = data.replace(/src\//g, ''); 
                const reg = /<script src=\"([a-zA-Z]|\/)*\.?[a-zA-Z]*\"><\/script>/ig;
                const newData =  data.replace(reg,'');
                fs.writeFile(__dirname + '/dist/index.html',minify(newData,{removeComments: true,collapseWhitespace: true,minifyJS:false, minifyCSS:false}), function(err) {
                    if (err) {
                        throw new Error('修改编译后的 HTML 文件失败...');
                    }
                });
            });
        }
    })
  ]
};
