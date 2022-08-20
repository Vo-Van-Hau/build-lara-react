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

// Load preset
/**
 *
[
    'node.exe',
    'build\\mix',
    'watch',
    'backend',
    'reports'
]
 */
const args = global.process.argv.splice(2);
const config = require('./config');
const preset_name = args[0] || config.defaultPreset;
const preset = config.presets[preset_name];
if (!preset) {
    console.log('Invalid preset: ', preset_name);
    console.log('Available presets: ', Object.keys(config.presets).join(','));
    global.process.exit(1);
}
// Set env
global.process.env.NODE_ENV = preset.env || config.defaultEnv;

// MIX_SOURCE env
const source_name = args[1] || config.defaultPackage;
global.process.env.MIX_SOURCE = source_name;

// MIX_MODULE env
const module_name = args[2] || config.defaultPackage;
global.process.env.MIX_MODULE = capitalizeFirstLetter(module_name);

/**
 * ----------------Before----------------
 * "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "npm run development -- --watch",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --disable-host-check --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
    }
 * ----------------After----------------
    "scripts": {
        "dev": "npm run development",
        "development": "mix",
        "watch": "mix watch",
        "watch-poll": "mix watch -- --watch-options-poll=1000",
        "hot": "mix watch --hot",
        "prod": "npm run production",
        "production": "mix --production"
    }
 */
global.process.argv = [global.process.argv[0], global.process.argv[1]].concat(config.baseArgs).concat(preset.args);
global.process.argv.push('--config=' + (preset.config || config.defaultConfig));
/**
[
  'node.exe',
  'build\\mix',
  '--progress',
  '--watch',
  '--config=./node_modules/laravel-mix/setup/webpack.config.js'
]
 */

// Debug
console.log('[MIX] Source Name: ' + source_name);
console.log('[MIX] Module Name: ' + module_name);

// projectRoot
global.process.processRoot = config.projectRoot;

// Require entry
require(path.resolve(config.projectRoot, preset.entry || config.defaultEntry));






