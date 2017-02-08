var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.join(__dirname, "../src/js/index.js"),
    //公共模块
    vendors: [
        'webpack-zepto'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        filename: '../dist/index.html', //生成的html存放路径，相对于 path
        template: path.resolve(__dirname, '../index.html'), //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //为静态资源生成hash值
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
        }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/lib/[name]-[hash].js'),
    new ExtractTextPlugin('css/style-[contenthash].css')
  ],
  module: {
    loaders: [
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')
      },{
        test: /\.(png|jpg)$/, loader: 'url?limit=25000'
      },{
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },{
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },{
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },{
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
};
