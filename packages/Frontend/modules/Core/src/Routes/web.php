<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;

Route::middleware(['web'])->group(function () {
    Route::get('/', function(){
        return redirect('/' . Config::get('module.core.frontend_url'));
    });
    Route::controller(\Frontend\Auth\Controllers\AuthController::class)->group(function() {
        Route::get('/auth/login', 'login');
        Route::get('/auth/register', 'login');
    });
});

// Route::middleware(['web', 'auth_frontend'])->group(function () {
    Route::controller(Frontend\Core\Controllers\IndexController::class)->group(function() {
        Route::any('/', 'index');
        Route::any('/index', 'index');
        Route::any('/{controller}', 'index');
        Route::any('/{controller}/{action}', 'index');
        Route::any('/{controller}/{action}/{param}', 'index');
    });
// });

