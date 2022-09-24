<?php

namespace Sellers\Publishers\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

class PublishersServiceProvider extends ServiceProvider {

    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;
    protected $package = "Sellers";
    protected $module = "Publishers";
    protected $models = [
        "Publishers" => [
            "name" => "Publishers",
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
        $this->loadViewsFrom(__DIR__ . "/../../resources/views", Config::get("packages.sellers.publishers.namespace", "PublishersSellers"));

        // Load Lang
        $this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", Config::get("packages.sellers.publishers.namespace", "PublishersSellers"));

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
            return $this->app->make("Modules\\{$this->module}\\{$this->module}");
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
        $this->publishes([__DIR__ . "/../../config/config.php" => config_path("sellers/module/publishers.php")], "config");
    }
}
