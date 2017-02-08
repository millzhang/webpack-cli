var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';

config.module = {
    loaders: [ //加载器
        {
            test: /\.css$/,
            // loader: ExtractTextPlugin.extract("style-loader","css-loader")
            loader:'style-loader!css-loader'
        }
    ]
};
config.plugins = [
    // 添加三个插件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/style.css', {
        allChunks: false
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        filename: '../dist/index.html', //生成的html存放路径，相对于 path
        template: path.resolve(__dirname, '../index.html'), //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: true, //为静态资源生成hash值
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
        }
    }),
    //设置全局
    new webpack.ProvidePlugin({
      $:'webpack-zepto'
    })
];

// 动态向入口配置中注入 webpack-hot-middleware/client
// var devClient = 'webpack-hot-middleware/client';
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function(name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})

module.exports = config;
