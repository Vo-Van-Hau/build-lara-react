<?php

namespace Frontend\Checkout\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

/**
 * @author <hauvo1709@gmail.com>
 * @package Provider
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-25
 */
class CheckoutServiceProvider extends ServiceProvider {

    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;
    protected $package = "Frontend";
    protected $module = "Checkout";
    protected $models = [
        "Carts" => [
            "name" => "Carts",
            "status" => "active",
        ]
    ];

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot() {

        /* To register your package's views with Laravel, you need to tell Laravel where the views are located.
         * You may do this using the service provider's loadViewsFrom method.
         */
        $this->loadViewsFrom(__DIR__ . "/../../resources/views", Config::get("packages.frontend.checkout.namespace", "CheckoutFrontend"));

        // Load Lang
        $this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", Config::get("packages.frontend.checkout.namespace", "CheckoutFrontend"));

        // Load migrations
        $this->loadMigrationsFrom(__DIR__ . "/../../database/migrations");

        $this->publishResources();

        $this->commands([]);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Register the service provider.
     * @return void
     */
    public function register() {
        $this->app->bind($this->module . $this->package, function ($app) {
            return $this->app->make("{$this->package}\\{$this->module}\\{$this->module}");
        });
        foreach ($this->models as $model) {
            if($model["status"] != "active") continue;
            $this->app->bind(
                "{$this->package}\\{$this->module}\Interfaces\\{$model["name"]}RepositoryInterface",
                "{$this->package}\\{$this->module}\Repositories\Eloquents\\{$model["name"]}Repository"
            );
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Publish resources.
     * @return void
     */
    private function publishResources() {

        //Publish Resource
        $this->publishes([__DIR__ . "/../../config/config.php" => config_path("frontend/module/checkout.php")], "config");
    }
}
