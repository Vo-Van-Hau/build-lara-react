<?php

namespace Modules\Users\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

class UsersServiceProvider extends ServiceProvider {

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

        /* To register your package's views with Laravel, you need to tell Laravel where the views are located.
         * You may do this using the service provider's loadViewsFrom method.
         */
        $this->loadViewsFrom(__DIR__ . "/../../resources/views", Config::get("module.users.namespace", "Users"));

        // Load Lang
        $this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", Config::get("module.users.namespace", "Users"));

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

        /** Bind Core */
        $this->app->bind("Users", function ($app) {
            return $this->app->make("Modules\Users\Users");
        });

        $this->app->singleton(
            \Modules\Users\Interfaces\UsersRepositoryInterface::class,
            \Modules\Users\Repositories\Eloquents\UsersRepository::class
        );
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Publish resources.
     * @return void
     */
    private function publishResources() {

        //Publish Resource
        $this->publishes([__DIR__ . "/../../config/config.php" => config_path("module/users.php")], "config");
    }
}
