<?php

use Illuminate\Support\Facades\Route;

Route::middleware(["web"])->group(function () {
    Route::get("/", function(){
        return redirect("/" . Config::get("module.core.backend_url"));
    });
});

Route::middleware(["web"])->group(function () {
    Route::controller(Modules\Core\Controllers\IndexController::class)->group(function () {
        Route::any("/", "index");
        Route::any("/index", "index");
        Route::any("/{controller}", "index");
        Route::any("/{controller}/{action}", "index");
        Route::any("/{controller}/{action}/{param}", "index");
    });
});

