'use strict';
const path = require('path');
var webpack = require('webpack');
module.exports = {
    target: 'electron',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/app'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader'
            },
            {
                test: /\.(ttf|eot)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/)
    ],
    devtool: 'inline-source-map'
};