const mix = require('laravel-mix');
const resourcePath = './modules/Core';
const publicPath = './public/themes/backend/modules/core';
const moduleName = 'core';

if(!moduleName) return;
mix.setPublicPath(`${publicPath}`);
if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
mix
    .js(resourcePath + '/resources/assets/js/index.jsx', '/js')
    .copy(publicPath + '/js/index.js', resourcePath + '/public/js')
    .react()
mix
    .sass(resourcePath + '/resources/assets/sass/index.scss', '/css')
    .copy(publicPath + '/css/index.css', resourcePath + '/public/css')

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Objetc} obj
 * @returns
 */
 function _interopRequireDefault(obj) {
    return obj && !obj.__esModule ? obj : { default: obj };
}
var _cleanWebpackPlugin = _interopRequireDefault(
    require('clean-webpack-plugin')
);
mix.webpackConfig({
    mode: global.process.env.NODE_ENV,
    devtool: process.argv.find((x) => x.toLowerCase() === '--nomap') ? false : 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    plugins: [
        _cleanWebpackPlugin && _cleanWebpackPlugin.default ? new _cleanWebpackPlugin.default.CleanWebpackPlugin() : new _cleanWebpackPlugin.CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                // test: /\.(js|jsx)$/,
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            // '@babel/preset-typescript',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            // '@babel/plugin-syntax-function-bind',
                            // '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-syntax-dynamic-import'
                        ],
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    watchOptions: {
        ignored: /node_modules/,
    },
});
mix.extract(['react', 'jquery']);
if (mix.inProduction()) {
    mix.disableNotifications();
}
