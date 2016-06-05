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
        filename: '/bundle.js',
        sourceMapFilename: '/bundle.map'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: PATHS.app,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
};
