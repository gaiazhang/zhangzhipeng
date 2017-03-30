const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const config = require('config')

const ip = config.get('ip')
const port = config.get('port')

module.exports = {
   entry: {
    app: ['./src/index.js'],
    vendor: ['react','react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/assets/",
    filename: 'bundle.js',
  },
  devtool: 'source-map',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
/*    new HtmlWebpackPlugin({  //注释掉的
        template :'./src/index.html',
         hash:true, 
       // chunks: ['bundle'],
    }),*/
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })/*,
     new OpenBrowserPlugin({url: 'http://' + ip + ':' + port })*/ //自动打开游览器
  ]
};
