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
if (mix.inProduction()) {
    mix.disableNotifications();
}

