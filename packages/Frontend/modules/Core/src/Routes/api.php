<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(["web"])->group(function () {
    if (!empty($_SERVER["REQUEST_URI"])) {
        $uri = $_SERVER["REQUEST_URI"];
        $segments = explode(Config::get("module.core.frontend_url") . "/api", $uri);
        $module = "Index";
        $controller = null;
        $action = "index";
        if (!empty($segments[1])) {
            $arr_segments = explode("/", $segments[1]);
            if (!empty($arr_segments[1])) {
                $module = explode("?", ucfirst($arr_segments[1]))[0];
            }
            if (!empty($arr_segments[2])) {
                $controller = explode("?", ucfirst($arr_segments[2]))[0];
            }
            if (!empty($arr_segments[3])) {
                $action = explode("?", $arr_segments[3])[0];
            }
        }
        empty($controller) ? $controller = $module : "";
        Route::any("/{module}", "Frontend\\{$module}\\Controllers\\" . $controller . 'Controller@index');
        Route::any("/{module}/{controller}", "Frontend\\{$module}\\Controllers\\" . $controller . 'Controller@index');
        Route::any("/{module}/{controller}/{action}", "Frontend\\{$module}\\Controllers\\" . $controller . 'Controller@' . $action);
        Route::any("/{module}/{controller}/{action}/{param}", "Frontend\\{$module}\\Controllers\\" . $controller . 'Controller@' . $action);
    }
});




