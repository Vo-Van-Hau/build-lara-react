const mix = require('laravel-mix');
const packageName = 'Sellers';
const moduleName = 'Settings';
const resourcePath = `./packages/${packageName}/modules/${moduleName}`;
const publicPath = `./public/themes/${packageName.toLowerCase()}/modules/${moduleName.toLowerCase()}`;

if(!moduleName) return;
mix.setPublicPath(`${publicPath}`);
if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
mix
    .js(resourcePath + '/resources/assets/js/index.jsx', '/js/index.js')
    // .copy(publicPath + '/js/index.js', resourcePath + '/public/js')
    .react()
mix
    .sass(resourcePath + '/resources/assets/sass/index.scss', '/css')
    // .copy(publicPath + '/css/index.css', resourcePath + '/public/css')
if (mix.inProduction()) {
    mix.disableNotifications();
}
