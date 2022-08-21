<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;

Route::prefix(Config::get("module.core.backend_url"))->group(function () {
    Route::middleware(["web"])->group(function () {
        // Route::post("/auth/login", "Modules\\Auth\\Controllers\\AuthController@login");
        // Route::post("/auth/socialLogin", "Modules\\Auth\\Controllers\\AuthController@socialLogin");
        // Route::post("/auth/verify", "Modules\\Auth\\Controllers\\AuthController@verify");
        // Route::post("/auth/gg-verify", "Modules\\Auth\\Controllers\\AuthController@gg_verify");
        // Route::get("/auth/logout", "Modules\\Auth\\Controllers\\AuthController@logout");
        // Route::get("/auth", "Modules\\Auth\\Controllers\\AuthController@index");
        // Route::get("/auth/login", "Modules\\Auth\\Controllers\\AuthController@login");
        // Route::get("/auth/get-config", "Modules\\Auth\\Controllers\\AuthController@getConfig");
        // Route::post("/auth/change-locate", "Modules\\Auth\\Controllers\\AuthController@changeLocate");
    });
});
