const fs = require('fs');
const mix = require('laravel-mix');
const moduleName = 'Sellers';
const resourcePath = `./modules/${moduleName}`;
const publicPath = `./public/themes/backend/modules/${moduleName.toLowerCase()}`;

try {
    if(!moduleName) return;
    mix.setPublicPath(`${publicPath}`);
    if(mix.inProduction()) {
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
    if(mix.inProduction()) {
        mix.disableNotifications();
    }
} catch(errors) {
    console.error(errors);
}

