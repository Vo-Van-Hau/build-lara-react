<?php

namespace Modules\Core\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

/**
 * @author <hauvo1709@gmail.com>
 * @package Provider
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-07-21
 */
class CoreServiceProvider extends ServiceProvider {

    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;

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
        $this->loadViewsFrom(__DIR__ . "/../../resources/views", \Config::get("module.core.namespace", "Core"));

        // Load Lang
        $this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", \Config::get("module.core.namespace", "Core"));

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
        $this->app->bind("Core", function ($app) {
            return $this->app->make("Modules\Core\Core");
        });

         /** Bind Base to repository */
        //  $this->app->bind(
        //     "Modules\Core\Interfaces\BaseRepositoryInterface",
        //     \Modules\Core\Repositories\Eloquents\BaseRepository::class
        // );

        $this->app->singleton(
            \Modules\Core\Interfaces\BaseRepositoryInterface::class,
            \Modules\Core\Repositories\Eloquents\BaseRepository::class
        );
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Publish resources.
     * @return void
     */
    private function publishResources() {

        //Publish Resource
        $this->publishes([__DIR__ . "/../../config/config.php" => config_path("module/core.php")], "config");
    }
}
