const mix = require('laravel-mix');
const appPublicPath = global.process.env.MIX_BACKEND_ASSET ? 'public/' + global.process.env.MIX_BACKEND_ASSET : 'public';
const moduleName = global.process.env.MIX_MODULE;
const modulePath = global.process.processRoot;

if(moduleName) {
    mix.setPublicPath(`${appPublicPath}/modules/${moduleName.toLowerCase()}`);
}
if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
mix.js(modulePath + `/modules/${moduleName}/resources/assets/js/index.js`, 'js/index.js').react();

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Objetc} obj
 * @returns
 */
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Objetc} obj
 * @returns
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
}
var _cleanWebpackPlugin = _interopRequireDefault(
    require('clean-webpack-plugin')
);
mix.webpackConfig({
    mode: global.process.env.NODE_ENV,
    devtool: process.argv.find((x) => x.toLowerCase() === '--nomap') ? false : 'source-map',
    output: {
        libraryTarget: 'assign',
        library: `winter = typeof winter === 'object ? winter : {}; winter['${moduleName.toLowerCase()}']`,
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-bootstrap': 'ReactBootstrap'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    // plugins: [new _cleanWebpackPlugin.default()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-function-bind',
                            '@babel/plugin-proposal-function-bind',
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

if (mix.inProduction()) {
    mix.disableNotifications();
}

