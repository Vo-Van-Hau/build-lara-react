const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const defaultConfig = {
    defaultEnv:
        global.process.env.APP_ENV == 'production'
            ? 'production'
            : 'development',
    defaultSource: 'backend',
    defaultPackage: 'app',
    defaultPreset: 'dev',
    // baseArgs: ['--progress', '--hide-modules'],
    baseArgs: ['--progress'],
    defaultEntry: './node_modules/webpack/bin/webpack.js',
    defaultConfig: './node_modules/laravel-mix/setup/webpack.config.js',
    projectRoot: global.process.cwd(),
    presets: {
        dev: {
            args: ['--source-map'],
        },
        dev_server: {
            args: ['--no-progress', '--source-map'],
        },
        watch: {
            args: ['--watch'],
        },
        poll: {
            args: ['--watch', '--watch-poll'],
        },
        hot: {
            entry: 'node_modules/webpack-dev-server/bin/webpack-dev-server.js',
            args: ['--hot', '--inline'],
        },
        production: {
            env: 'production',
            args: ['--no-progress', '--nomap'],
        },
    },
};

// Base config
const config = Object.assign({}, defaultConfig);

// Extend config
const userConfigPath = path.resolve(config.projectRoot, 'mix.config.js');
if (fs.existsSync(userConfigPath)) {
    const userConfig = require(userConfigPath);
    _.defaultsDeep(config, userConfig);
}

module.exports = config;
