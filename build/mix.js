const path = require("path");
require("dotenv").config();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Load preset
const args = global.process.argv.splice(2);

const config = require("./config");

const preset_name = args[0] || config.defaultPreset;

const preset = config.presets[preset_name];
if (!preset) {
    console.log("Invalid preset", preset_name);
    console.log("Available presets:", Object.keys(config.presets).join(","));
    global.process.exit(1);
}

// Set env
global.process.env.NODE_ENV = preset.env || config.defaultEnv;

// MIX_PACKAGE env
const module_name = args[1] || config.defaultPackage;

global.process.env.MIX_MODULE = capitalizeFirstLetter(module_name);

// Set args
global.process.argv = [global.process.argv[0], global.process.argv[1]]
    .concat(config.baseArgs)
    .concat(preset.args);

// 'config' arg
global.process.argv.push("--config=" + (preset.config || config.defaultConfig));

// Debug
console.log("[MIX] Module Name: " + module_name);

//projectRoot
global.process.processRoot = config.projectRoot;

// Require entry
require(path.resolve(config.projectRoot, preset.entry || config.defaultEntry));
