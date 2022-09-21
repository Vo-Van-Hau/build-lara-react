const fs = require("fs");
const { MIX_MODULE, MIX_SOURCE, NPM, VENDOR, OUTPUT, output } = require("./build/utils");
let pathMix = '';
let branchesPath = '';
if(MIX_SOURCE && MIX_SOURCE.toLowerCase() === 'backend') {
    branchesPath = `${__dirname}/modules`;
    pathMix = `${branchesPath}/${MIX_MODULE}/webpack.mix.js`;
}
else if(MIX_SOURCE && MIX_SOURCE === 'frontend') {
    branchesPath = `${__dirname}/packages/Frontend/modules/${MIX_MODULE}`;
    pathMix = `${branchesPath}/webpack.mix.js`;
}
else if(MIX_SOURCE && MIX_SOURCE === 'sellers') {
    branchesPath = `${__dirname}/packages/Sellers/modules/${MIX_MODULE}`;
    pathMix = `${branchesPath}/webpack.mix.js`;
}

// fs.existsSync() The fs.existsSync() method is used to synchronously check if a file already exists in the given path or not.
// It returns a boolean value which indicates the presence of a file.
if (pathMix !== '' && fs.existsSync(pathMix)) {
    require(pathMix);
}
else {
    if(MIX_SOURCE === 'frontend') {
        require(`./packages/Frontend/build/webpack.mix.js`);
    }
    else {
        require(`./build/webpack.mix.js`);
    }
}
