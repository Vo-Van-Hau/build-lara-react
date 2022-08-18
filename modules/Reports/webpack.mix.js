const mix = require('laravel-mix');
const resourcePath = './modules/Reports';
const publicPath = './public/themes/backend/modules/reports';

mix.setPublicPath(`${publicPath}`);
mix
    .js(resourcePath + '/resources/assets/js/manifest.js', '/js')
    .copy(publicPath + '/js/manifest.js', resourcePath + '/public/js')
mix
    .js(resourcePath + '/resources/assets/js/vendor.js', '/js')
    .copy(publicPath + '/js/vendor.js', resourcePath + '/public/js')
mix
    .js(resourcePath + '/resources/assets/js/index.js', '/js')
    .copy(publicPath + '/js/index.js', resourcePath + '/public/js')
    .react()
mix
    .sass(resourcePath + '/resources/assets/sass/index.scss', '/css')
    .copy(publicPath + '/css/index.css', resourcePath + '/public/css')

