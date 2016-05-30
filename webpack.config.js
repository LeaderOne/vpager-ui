const path = require('path');

const PATHS = {
    main: path.join(__dirname, 'src/main'),
    app: path.join(__dirname, 'src/main/js'),
    build: path.join(__dirname, 'target')
};

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: PATHS.main + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: PATHS.app,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: PATHS.app,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
};
