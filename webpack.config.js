var path = require('path');
var webpack = require('webpack');
var config = {
    entry: ['babel-polyfill',
        './main.js'
    ],

    output: {
        path: './',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 8081,
        hot: true
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.s[ac]ss$/,
            loaders: ['style', 'css', 'sass']
        }]
    }
}

module.exports = config;
