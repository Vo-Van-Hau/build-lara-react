<?php
use Illuminate\Support\Facades\Route;

/** PublicIndex */
Route::middleware(["web"])->group(function () {
    Route::get("/", function(){
        return redirect("/" . Config::get("module.core.backend_url"));
    });
});

//Backend Router
Route::prefix(Config::get('module.core.backend_url_v2'))->group(function () {

    Route::prefix('api')->group(function () {
        Route::middleware(['web', 'auth_backend'])->group(function () {
            if (!empty($_SERVER['REQUEST_URI'])) {
                $uri = $_SERVER['REQUEST_URI'];
                $segments = explode(Config::get('module.core.backend_url_v2') . '/api', $uri);
                $module = 'Index';
                $controller = null;
                $action = 'index';
                if (!empty($segments[1])) {
                    $arr_segments = explode('/', $segments[1]);
                    if (!empty($arr_segments[1])) {
                        $module = explode('?', ucfirst($arr_segments[1]))[0];
                    }
                    if (!empty($arr_segments[2])) {
                        $controller = explode('?', ucfirst($arr_segments[2]))[0];
                    }
                    if (!empty($arr_segments[3])) {
                        $action = explode('?', $arr_segments[3])[0];
                    }
                }
                empty($controller) ? $controller = $module : '';
                Route::any("/{module}", "Modules\\{$module}\\Controllers\\" . $controller . 'Controller@index');
                Route::any("/{module}/{controller}", "Modules\\{$module}\\Controllers\\" . $controller . 'Controller@index');
                Route::any("/{module}/{controller}/{action}", "Modules\\{$module}\\Controllers\\" . $controller . 'Controller@' . $action);
                Route::any("/{module}/{controller}/{action}/{param}", "Modules\\{$module}\\Controllers\\" . $controller . 'Controller@' . $action);
            }
        });
    });

    Route::middleware(['web', 'auth_backend'])->group(function () {
        Route::any('/ckfinder/connector', 'Modules\Core\Controllers\CKFinderController@requestAction')
            ->name('ckfinder_connector');
        Route::any('/ckfinder/browser', 'Modules\Core\Controllers\CKFinderController@browserAction')
            ->name('ckfinder_browser');
        //if (!empty($_SERVER['REQUEST_URI'])) {
        Route::any("/", "Modules\\Core\\Controllers\\IndexController@index");
        Route::any("/index", "Modules\\Core\\Controllers\\IndexController@index");
        Route::any("/{controller}", "Modules\\Core\\Controllers\\IndexController@index");
        Route::any("/{controller}/{action}", "Modules\\Core\\Controllers\\IndexController@index");
        Route::any("/{controller}/{action}/{param}", "Modules\\Core\\Controllers\\IndexController@index");
        //}
    });
});
