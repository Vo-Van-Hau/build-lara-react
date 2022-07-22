/*
 Laravel mix utils
 */
exports.MIX_MODULE = global.process.env.MIX_MODULE;

exports.NPM = "./node_modules/";
exports.VENDOR = "./resources/assets/vendor/";

exports.output = function (package_name) {
    return "public/assets/" + package_name + "/";
};

exports.OUTPUT = exports.output(exports.MIX_MODULE);
