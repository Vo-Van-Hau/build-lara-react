<?php

namespace Sellers\Core\Providers;

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
 * @since 2022-09-21
 */
class CoreServiceProvider extends ServiceProvider {

    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;
    protected $package = "Sellers";
    protected $module = "Core";
    protected $models = [
        "Core" => [
            "name" => "Core",
            "status" => "active",
        ]
    ];

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot() {

        // Load routes
        // $this->loadRoutesFrom(__DIR__ . "/../Routes/web.php");

        /* To register your package's views with Laravel, you need to tell Laravel where the views are located.
         * You may do this using the service provider's loadViewsFrom method.
         */
        $this->loadViewsFrom(__DIR__ . "/../../resources/views", Config::get("packages.sellers.core.namespace", "CoreSellers"));

        // Load Lang
        $this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", Config::get("packages.sellers.core.namespace", "CoreSellers"));

        // Load migrations
        $this->loadMigrationsFrom(__DIR__ . "/../../database/migrations");

        $this->publishResources();
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Register the service provider.
     * @return void
     */
    public function register() {
        /** Bind Core */
        $this->app->bind($this->module . $this->package, function ($app) {
            return $this->app->make("{$this->package}\\{$this->module}\\{$this->module}");
        });
        /** Bind Base to repository */
        foreach ($this->models as $model) {
            if($model["status"] != "active") continue;
            // $this->app->bind(
            //     "Modules\\{$this->module}\Interfaces\\{$model["name"]}RepositoryInterface",
            //     "Modules\\{$this->module}\Repositories\Eloquents\\{$model["name"]}Repository"
            // );
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Publish resources.
     * @return void
     */
    private function publishResources() {

        //Publish Resource
        $this->publishes([__DIR__ . "/../../config/config.php" => config_path("sellers/module/core.php")], "config");
    }
}
