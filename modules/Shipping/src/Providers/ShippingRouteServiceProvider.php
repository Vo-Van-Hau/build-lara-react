<?php

namespace Modules\Shipping\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;

class ShippingRouteServiceProvider extends RouteServiceProvider {

    /**
     * The path to the "admin" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const ADMIN = "/admin";

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot() {
        $this->configureRateLimiting();
        $this->routes(function () {
            Route::prefix(Config::get("module.core.backend_url"))->group(function() {
                Route::prefix("/")
                    ->namespace($this->namespace)
                    ->group(__DIR__ . "/../Routes/web.php");
                Route::prefix("api")
                    ->namespace($this->namespace)
                    ->group(__DIR__ . "/../Routes/api.php");
            });
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting() {
        RateLimiter::for("api", function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
