const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// multiple extract instances

module.exports = {
    entry: {
        index: path.join(__dirname, "../src/js/index.js"),
        //公共模块
        vendors: [
            'webpack-zepto'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: "/",
        filename: "js/[name].js",
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [ //加载器
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            }
        ]
    }
};
