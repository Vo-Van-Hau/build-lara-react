<?php

namespace Modules\Sellers\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

class SellersServiceProvider extends ServiceProvider {

    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;
    protected $module = "Sellers";
    protected $models = [
        "Sellers" => [
            "name" => "Sellers",
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
        $this->loadViewsFrom(__DIR__ . "/../../resources/views", Config::get("module.sellers.namespace", "Sellers"));

        // Load Lang
        $this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", Config::get("module.sellers.namespace", "Sellers"));

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
        $this->app->bind($this->module, function ($app) {
            return $this->app->make("Modules\{$this->module}\{$this->module}");
        });
        foreach ($this->models as $model) {
            if($model["status"] != "active") continue;
            $this->app->bind(
                "Modules\\{$this->module}\Interfaces\\{$model["name"]}RepositoryInterface",
                "Modules\\{$this->module}\Repositories\Eloquents\\{$model["name"]}Repository"
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
        $this->publishes([__DIR__ . "/../../config/config.php" => config_path("module/sellers.php")], "config");
    }
}
