const path = require('path');
require('dotenv').config();

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {string} string
 * @returns
 */
 function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const args = [
    global.process.env[`npm_config_source`],
    global.process.env[`npm_config_module`],
];
const source_name = args[0];
const module_name = args[1];
if(!source_name || !module_name) {
    console.log('Invalid source name: ', source_name);
    console.log('Available module name: ', module_name);
    return;
};

console.log('[Webpack] Source Name: ' + source_name);
console.log('[Webpack] Module Name: ' + capitalizeFirstLetter(module_name));

const resourcePath = `./modules/${capitalizeFirstLetter(module_name)}`;
const publicPath = `./public/themes/${source_name}/modules/${module_name.toLowerCase()}`;

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

module.exports = {
    mode: global.process.env.NODE_ENV ? global.process.env.NODE_ENV : 'development',
    devtool: process.argv.find((x) => x.toLowerCase() === '--nomap') ? false : 'source-map',
    entry: {
        index: {
            import: resourcePath + '/resources/assets/js/index.jsx'
        }
    },
    output: {
        // libraryTarget: 'assign',
        filename: '[name].js',
        path: path.resolve(__dirname, `${publicPath}/js`),
        library: {
            name: `winter_${module_name.toLowerCase()}`,
            type: 'global',
        },
        clean: true,
    },
    externals: {
        /**
         * Some bug:
         * - Hooks can only be called inside the body of a function component.
         */
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    plugins: [
        _cleanWebpackPlugin && _cleanWebpackPlugin.default ? new _cleanWebpackPlugin.default.CleanWebpackPlugin() : new _cleanWebpackPlugin.CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            ['@babel/preset-react', {'runtime': 'automatic'}]
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
    watch: false,
    watchOptions: {
        /**
         * For some systems, watching many files can result in a lot of CPU or memory usage.
         * It is possible to exclude a huge folder like node_modules using a regular expression
         */
        ignored: /node_modules/,
        /**
         * Add a delay before rebuilding once the first file changed.
         * This allows webpack to aggregate any other changes made during this time period into one rebuild. Pass a value in milliseconds:
         */
        // aggregateTimeout: 200,
        // poll: 1000, // Check for changes every second
    },
};



