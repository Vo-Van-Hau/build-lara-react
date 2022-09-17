<?php

namespace Modules\Module\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Modules\Core\Core;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-29
 */
class BuilderController extends ControllerBase {

    private $exclude_module = ["Auth", "Core"];

    protected $types = array(
        ["value" => "INTEGER", "label" => "INTEGER"],
        ["value" => "FLOAT", "label" => "FLOAT"],
        ["value" => "BOOLEAN", "label" => "BOOLEAN"],
        ["value" => "VARCHAR", "label" => "VARCHAR"],
        ["value" => "TEXT", "label" => "TEXT"],
        ["value" => "TOKEN", "label" => "TOKEN"],
        ["value" => "DATE", "label" => "DATE"],
        ["value" => "DATETIME", "label" => "DATETIME"],
        ["value" => "CHAR", "label" => "CHAR"],
        ["value" => "JSON", "label" => "JSON"],
        ["value" => "BIGINT", "label" => "BIGINT"],
    );

    public function __construct() {

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function index() {
        return response()->json([], 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_config(Request $request) {
        if($request->isMethod("post")) {
            $data = [
                "config" => [
                    "status" => Config::get("module.module.status_list", []),
                ]
            ];
            return response()->json($data, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get all modules
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_modules(Request $request) {
        if($request->isMethod("post")) {
            $module_path = Core::module_path();
            $modules = [];
            foreach (glob($module_path . "/*", GLOB_ONLYDIR) as $dir) {
                $folder = basename($dir);
                $composer_path = $module_path . $folder . "/package.json";
                $config = [];
                if (file_exists($composer_path)) {
                    $config = json_decode(file_get_contents($composer_path));
                    $modules[] = array(
                        "name" => $folder,
                        "module_name" => !empty($config->name) ? $config->name : "",
                        "version" => !empty($config->version) ? $config->version : "",
                        "allow_edit" => in_array($folder, $this->exclude_module) ? false : true,
                        "status" => !empty($config->status) ? $config->status : false,
                    );
                }
            }
            $data_json["modules"] = $modules;
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get databases (table in SQL) by module
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_databases(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $module = isset($input["module"]) ? $input["module"] : null;
            $databases = array();
            $module_path = Core::module_path();
            $database_path = $module_path . ucfirst($module);
            $model_path = $database_path . "/src/Models/*.php";
            foreach (glob($model_path) as $model) {
                $model_name = basename($model, ".php"); // Show filename, but cut off file extension for ".php" files
                $db_name = strtolower($model_name);
                if (strpos($db_name, "_translations") == false) {
                    $path = $database_path . "/metadata/databases/" . $db_name . "_database_structures.ini.php";
                    $translate = false;
                    if (is_file($path)) { // checks whether the specified filename is a regular file.
                        $db = include $path;
                        $db = !empty($db[strtolower($db_name)]) ? $db[strtolower($db_name)] : [];
                        $translate = !empty($db["translate"]) ? $db["translate"] : false;
                    }
                    $databases[] = [
                        "module" => ucfirst($module),
                        "name" => strtolower($model_name),
                        "is_checked" => true,
                        "translate" => $translate,
                    ];
                }
            }
            $data_json["databases"] = $databases;
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get single table in module
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_table(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $module_name = isset($input["module"]) ? ucfirst($input["module"]) : null;
            $table_name = isset($input["table"]) ? strtolower($input["table"]) : null;
            $database_path = Core::module_path() . $module_name . "/metadata/databases";
            $db_name = strtolower($table_name) . "_database_structures.ini.php";
            $db_file = $database_path . "/" . $db_name;
            $database = array();
            $field_list = array();
            if (is_file($db_file)) {
                $database = include $db_file;
            }
            $field_list = !empty($database[strtolower($table_name)]) ? $database[strtolower($table_name)] : array("fields" => array(), "indexes" => array());
            $fields = [];
            foreach ($field_list["fields"] as $key => &$value) {
                $value["name"] = $key;
                $fields[] = $value;
                unset($field_list["fields"][$key]);
            }
            $types = $this->types;
            return response()->json([
                    "field_list" => $field_list,
                    "fields" => $fields,
                    "types" => $types,
                    "translate" => !empty($database[$table_name]["translate"]) ? $database[$table_name]["translate"] : false,
                ], 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: create new module
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function create_module(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $name = isset($input["name"]) ? strtolower(trim($input["name"])) : null;
            if(is_null($name)) return $this->response_base(["status" => false], "You have failed to create new module!!!", 200);
            $validator = Validator::make($input, array(
                "name" => "required",
            ));
            if($validator->fails()) return $this->response_base(["status" => false], trans("Module::module.invalid_credentials"), 200);
            /**
             * @todo: create <Module> folder
             */
            $module_name = ucfirst($name);
            $current_datetime = date("Y-m-d");
            $path = Core::module_path();
            $module_path = $path . $module_name;
            if(is_dir($module_path)) return $this->response_base(["status" => false], trans("Module::module.module_was_exits"), 200);
            if(!mkdir($module_path, 0777, true)) return $this->response_base(["status" => false], trans("Module::module.can_not_save_module"), 200);
            /**
             * @todo: create <Controllers> folder in module
             */
            $controller_path = $module_path . "/src/Controllers";
            if (!is_dir($controller_path)) mkdir($controller_path, 0777, true);
            $controller_file = $controller_path . "/" . $module_name . "Controller.php";
            if (!is_file($controller_file)) {
                $file = fopen($controller_file, "w"); // used to create a file
                $content = <<<EOD
                    <?php

                    namespace Modules\\{$module_name}\\Controllers;

                    use Modules\Core\Controllers\ControllerBase;

                    /**
                     * @author <hauvo1709@gmail.com>
                     * @package Controller
                     * @copyright 2022 http://www.cayluaviet.online/
                     * @license License 1.0
                     * @version Release: 1.00.000
                     * @link http://www.docs.v1.cayluaviet.online/
                     * @since {$current_datetime}
                     */
                    class {$module_name}Controller extends ControllerBase {

                        public function __construct() {

                        }

                        /**
                         * @author <vanhau.vo@urekamedia.vn>
                         * @todo:
                         * @param:
                         * @return void
                         */
                        public function index(){
                            return response()->json([], 200);
                        }
                    }
                EOD;
                fwrite($file, $content); // used to write to a file.
                fclose($file);
            }
            /**
             * @todo: create <Commands> folder in module
             */
            $command_path = $module_path . "/src/Commands";
            if (!is_dir($command_path)) mkdir($command_path, 0777, true);
            /**
             * @todo: create <Facades> folder in module
             */
            $facede_path = $module_path . "/src/Facades";
            if (!is_dir($facede_path)) mkdir($facede_path, 0777, true);
            $facede_file = $facede_path . "/" . $module_name . ".php";
            if (!is_file($facede_file)) {
                $file = fopen($facede_file, "w"); // used to create a file
                $content = <<<EOD
                    <?php

                    namespace Modules\\{$module_name}\\Facades;

                    use Illuminate\Support\Facades\Facade;

                    /**
                     * @author <hauvo1709@gmail.com>
                     * @package Controller
                     * @copyright 2022 http://www.cayluaviet.online/
                     * @license License 1.0
                     * @version Release: 1.00.000
                     * @link http://www.docs.v1.cayluaviet.online/
                     * @since {$current_datetime}
                     */
                    class {$module_name} extends Facade {

                        /**
                         * Get the registered name of the component.
                         *
                         * @return string
                         */
                        protected static function getFacadeAccessor() {
                            return "{$module_name}";
                        }
                    }
                EOD;
                fwrite($file, $content); // used to write to a file.
                fclose($file);
            }
            /**
             * @todo: create <Helpers> folder in module
             */
            $helper_path = $module_path . "/src/Helpers";
            if (!is_dir($helper_path)) mkdir($helper_path, 0777, true);
            /**
             * @todo: create <Interfaces> folder in module
             */
            $interface_path = $module_path . "/src/Interfaces";
            if (!is_dir($interface_path)) mkdir($interface_path, 0777, true);
            $interface_file = $interface_path . "/" . $module_name . "RepositoryInterface.php";
            if (!is_file($interface_file)) {
                $file = fopen($interface_file, "w"); // used to create a file
                $content = <<<EOD
                    <?php

                    namespace Modules\\{$module_name}\\Interfaces;

                    use Modules\Core\Interfaces\BaseRepositoryInterface;

                    /**
                     * @author <hauvo1709@gmail.com>
                     * @package Interface
                     * @copyright 2022 http://www.cayluaviet.online/
                     * @license License 1.0
                     * @version Release: 1.00.000
                     * @link http://www.docs.v1.cayluaviet.online/
                     * @since {$current_datetime}
                     */
                    interface {$module_name}RepositoryInterface extends BaseRepositoryInterface {

                    }
                EOD;
                fwrite($file, $content); // used to write to a file.
                fclose($file);
            }
            /**
             * @todo: create <Models> folder in module
             */
            $model_path = $module_path . "/src/Models";
            if (!is_dir($model_path)) mkdir($model_path, 0777, true);
            /**
             * @todo: create <Providers> folder in module
             */
            $provider_path = $module_path . "/src/Providers";
            if (!is_dir($provider_path)) mkdir($provider_path, 0777, true);
            $providers_file = [
                0 => $provider_path . "/" . $module_name . "RouteServiceProvider.php",
                1 => $provider_path . "/" . $module_name . "ServiceProvider.php"
            ];
            foreach ($providers_file as $key => $provider_file) {
                if (!is_file($provider_file)) {
                    $file = fopen($provider_file, "w"); // used to create a file
                    if($key == 0) {
                        $content = <<<EOD
                            <?php

                            namespace Modules\\{$module_name}\\Providers;

                            use Illuminate\Cache\RateLimiting\Limit;
                            use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
                            use Illuminate\Http\Request;
                            use Illuminate\Support\Facades\RateLimiter;
                            use Illuminate\Support\Facades\Route;
                            use Illuminate\Support\Facades\Config;

                            class {$module_name}RouteServiceProvider extends RouteServiceProvider {

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
                                // protected \$namespace = 'App\\Http\\Controllers';

                                /**
                                 * Define your route model bindings, pattern filters, etc.
                                 *
                                 * @return void
                                 */
                                public function boot() {
                                    \$this->configureRateLimiting();
                                    \$this->routes(function () {
                                        Route::prefix(Config::get("module.core.backend_url"))->group(function() {
                                            Route::prefix("/")
                                                ->namespace(\$this->namespace)
                                                ->group(__DIR__ . "/../Routes/web.php");
                                            Route::prefix("api")
                                                ->namespace(\$this->namespace)
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
                                    RateLimiter::for("api", function (Request \$request) {
                                        return Limit::perMinute(60)->by(optional(\$request->user())->id ?: \$request->ip());
                                    });
                                }
                            }
                        EOD;
                    } else {
                        $content = <<<EOD
                            <?php

                            namespace Modules\\{$module_name}\\Providers;

                            use Illuminate\Foundation\AliasLoader;
                            use Illuminate\Support\ServiceProvider;
                            use Illuminate\Support\Facades\Config;

                            class {$module_name}ServiceProvider extends ServiceProvider {

                                /**
                                 * @var \Illuminate\Foundation\Application
                                 */
                                protected \$app;
                                protected \$module = "{$module_name}";
                                protected \$models = [
                                    "{$module_name}" => [
                                        "name" => "{$module_name}",
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
                                    \$this->loadViewsFrom(__DIR__ . "/../../resources/views", Config::get("module.{$name}.namespace", "{$module_name}"));

                                    // Load Lang
                                    \$this->loadTranslationsFrom(__DIR__ . "/../../resources/lang", Config::get("module.{$name}.namespace", "{$module_name}"));

                                    // Load migrations
                                    \$this->loadMigrationsFrom(__DIR__ . "/../../database/migrations");

                                    \$this->publishResources();

                                    \$this->commands([]);
                                }

                                /**
                                 * @author <vanhau.vo@urekamedia.vn>
                                 * @todo: Register the service provider.
                                 * @return void
                                 */
                                public function register() {
                                    \$this->app->bind(\$this->module, function (\$app) {
                                        return \$this->app->make("Modules\\{\$this->module}\\{\$this->module}");
                                    });
                                    foreach (\$this->models as \$model) {
                                        if(\$model["status"] != "active") continue;
                                        \$this->app->bind(
                                            "Modules\\\{\$this->module}\Interfaces\\\{\$model["name"]}RepositoryInterface",
                                            "Modules\\\{\$this->module}\Repositories\Eloquents\\\{\$model["name"]}Repository"
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
                                    \$this->publishes([__DIR__ . "/../../config/config.php" => config_path("module/{$name}.php")], "config");
                                }
                            }
                        EOD;
                    }
                    fwrite($file, $content); // used to write to a file.
                    fclose($file);
                }
            }
            /**
             * @todo: create <Repositories> folder in module
             */
            $repository_path = $module_path . "/src/Repositories";
            if (!is_dir($repository_path)) mkdir($repository_path, 0777, true);
            $eloquents_path = $repository_path . "/Eloquents";
            if (!is_dir($eloquents_path)) mkdir($eloquents_path, 0777, true);
            $repository_file = $eloquents_path . "/" . $module_name . "Repository.php";
            if (!is_file($repository_file)) {
                $file = fopen($repository_file, "w"); // used to create a file
                $content = <<<EOD
                    <?php

                    namespace Modules\\{$module_name}\\Repositories\Eloquents;

                    use Modules\Core\Repositories\Eloquents\BaseRepository;
                    use Modules\\{$module_name}\\Interfaces\\{$module_name}RepositoryInterface;
                    use Modules\Core\Models\ModelBase;

                    class {$module_name}Repository extends BaseRepository implements {$module_name}RepositoryInterface {

                        /**
                         * @var Eloquent | Model
                         */
                        protected \$model;

                        /**
                         * @var Eloquent | Model
                         */
                        protected \$originalModel;

                        /**
                         * Repository constructor.
                         * @param Model|Eloquent \$model
                         *
                         */
                        public function __construct() {}
                    }
                EOD;
                fwrite($file, $content); // used to write to a file.
                fclose($file);
            }
            /**
             * @todo: create <Requests> folder in module
             */
            $request_path = $module_path . "/src/Requests";
            if (!is_dir($request_path)) mkdir($request_path, 0777, true);
            /**
             * @todo: create <Traits> folder in module
             */
            $trait_path = $module_path . "/src/Traits";
            if (!is_dir($trait_path)) mkdir($trait_path, 0777, true);
            /**
             * @todo: create <module> file in root module
             */
            $module_file = $module_path . "/" . $module_name . ".php";
            if (!is_file($module_file)) {
                $file = fopen($module_file, "w"); // used to create a file
                $content = <<<EOD
                    <?php

                    namespace Modules\\{$module_name};

                    /**
                     * @author <hauvo1709@gmail.com>
                     * @package Controller
                     * @copyright 2022 http://www.cayluaviet.online/
                     * @license License 1.0
                     * @version Release: 1.00.000
                     * @link http://www.docs.v1.cayluaviet.online/
                     * @since {$current_datetime}
                     */
                    class {$module_name} {

                        /**
                         * Constructor.
                         */
                        public function __construct() {}
                    }
                EOD;
                fwrite($file, $content); // used to write to a file.
                fclose($file);
            }
            /**
             * @todo: create <database> folder in module
             */
            $database = $module_path . "/database";
            if (!is_dir($database)) mkdir($database, 0777, true);
            $database_into = [
                $database . "/factories",
                $database . "/migrations",
            ];
            foreach ($database_into as $path) {
                if (!is_dir($path)) mkdir($path, 0777, true);
            }
            /**
             * @todo: create <resources> folder in module
             */
            $resources = $module_path . "/resources";
            if (!is_dir($resources)) mkdir($resources, 0777, true);
            $locate_path = $resources . "/lang/en";
            if (!is_dir($locate_path)) mkdir($locate_path, 0777, true);
            $locale_file = $locate_path . "/" . strtolower($module_name) . ".php";
            if (!is_file($locale_file)) {
                $file = fopen($locale_file, "w");
                $content = <<<EOD
                    <?php

                    return [];
                EOD;
                fwrite($file, $content);
                fclose($file);
            }
            $views_path = $resources . "/views";
            if (!is_dir($views_path)) mkdir($views_path, 0777, true);
            /**
             * @todo: create <assets> folder in resources folder
             */
            $asset_path = [
                $resources . "/assets",
                $resources . "/assets/js",
                $resources . "/assets/scss",
            ];
            foreach ($asset_path as $path) {
                if (!is_dir($path)) mkdir($path, 0777, true);
            }
            $react_file = $resources . "/assets/js/index.jsx";
            if (!is_file($react_file)) {
                $file = fopen($react_file, "w");
                $content = <<<EOD
                    const {$module_name} = () => {
                        return (
                            <>Hello {$module_name} Module</>
                        )
                    }

                    export default {$module_name};
                EOD;
                fwrite($file, $content);
                fclose($file);
            }
            $scss_file = $resources . "/assets/scss/index.scss";
            if (!is_file($scss_file)) {
                $file = fopen($scss_file, "w");
                $content = <<<EOD
                    // scss in here
                EOD;
                fwrite($file, $content);
                fclose($file);
            }
            /**
             * @todo: create <Routes> folder in module
             */
            $route_folder = $module_path . "/src/Routes";
            if(!is_dir($route_folder)) mkdir($route_folder, 0777, true);
            $routes_path = [
                $route_folder . "/web.php",
                $route_folder . "/api.php"
            ];
            foreach ($routes_path as $path) {
                if (!is_file($path)) {
                    $file = fopen($path, "w");
                    $content = <<<EOD
                        <?php
                    EOD;
                    fwrite($file, $content);
                    fclose($file);
                }
            }
            /**
             * @todo: create package.json file in root module
             */
            $package = [
                "name" => strtolower($module_name),
                "version" => "1.00.000",
                "author" => [
                    [
                        "name" => "vovanhau",
                        "email" => "vanhau.vo@urekamedia.vn"
                    ]
                ],
                "dependencies" => array(),
                "devDependencies" => array(),
                "menu" => [],
                "status" => false
            ];
            $path_package = $module_path . "/package.json";
            if (!is_file($path_package)) {
                file_put_contents($path_package, json_encode($package, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT));
            }
             /**
             * @todo: create webpack.mix.js file in root module
             */
            $path_webpack_mix = $module_path . "/webpack.mix.js";
            if (!is_file($path_webpack_mix)) {
                $file = fopen($path_webpack_mix, "w");
                $content = <<<EOD
                    const mix = require('laravel-mix');
                    const moduleName = '{$module_name}';
                    const resourcePath = `./modules/\${moduleName}`;
                    const publicPath = `./public/themes/backend/modules/\${moduleName.toLowerCase()}`;

                    if(!moduleName) return;
                    mix.setPublicPath(`\${publicPath}`);
                    if (mix.inProduction()) {
                        mix.version();
                    } else {
                        mix.sourceMaps();
                    }
                    mix
                        .js(resourcePath + '/resources/assets/js/index.jsx', '/js/index.js')
                        // .copy(publicPath + '/js/index.js', resourcePath + '/public/js')
                        .react()
                    mix
                        .sass(resourcePath + '/resources/assets/sass/index.scss', '/css')
                        // .copy(publicPath + '/css/index.css', resourcePath + '/public/css')
                    if (mix.inProduction()) {
                        mix.disableNotifications();
                    }
                EOD;
                fwrite($file, $content);
                fclose($file);
            }
            /**
             * @todo: create <metadata> folder in module
             */
            $metadata_path = $module_path . "/metadata";
            if (!is_dir($metadata_path)) mkdir($metadata_path, 0777, true);
            /**
             * @todo: create <databases> folder in module/metadata
             */
            $db_dir = $metadata_path . "/databases";
            if (!is_dir($db_dir)) mkdir($db_dir, 0777, true);
            /**
             * @todo: create <layouts> folder in module/metadata
             */
            $layout_dir = $metadata_path . "/layouts";
            if (!is_dir($layout_dir)) mkdir($layout_dir, 0777, true);
            return $this->response_base(["status" => true], trans("Module::module.save_module_success"), 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: create new table SQL
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function create_table(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $module_name = isset($input["module"]) ? ucfirst($input["module"]) : null;
            $table_name = isset($input["name"]) ? strtolower($input["name"]) : null;
            $validator = Validator::make($input, array(
                "name" => "required",
                "module" => "required",
            ));
            if($validator->fails()) return $this->response_base(["status" => false], trans("Module::module.invalid_credentials"), 200);
            $module_path = Core::module_path() . $module_name;
            $current_datetime = date("Y-m-d");
            if (!empty($input["with_controller"]) && $input["with_controller"]) {
                /**
                 * @todo: create <Controllers> folder in module
                 */
                $controller_path = $module_path . "/src/Controllers";
                $controller_name = ucfirst($table_name);
                if (!is_dir($controller_path)) mkdir($controller_path, 0777, true);
                $controller_file = $controller_path . "/" . $controller_name . "Controller.php";
                if (!is_file($controller_file)) {
                    $file = fopen($controller_file, "w"); // used to create a file
                    $content = <<<EOD
                        <?php

                        namespace Modules\\{$module_name}\\Controllers;

                        use Modules\Core\Controllers\ControllerBase;

                        /**
                         * @author <hauvo1709@gmail.com>
                         * @package Controller
                         * @copyright 2022 http://www.cayluaviet.online/
                         * @license License 1.0
                         * @version Release: 1.00.000
                         * @link http://www.docs.v1.cayluaviet.online/
                         * @since {$current_datetime}
                         */
                        class {$controller_name}Controller extends ControllerBase {

                            public function __construct() {

                            }

                            /**
                             * @author <vanhau.vo@urekamedia.vn>
                             * @todo:
                             * @param:
                             * @return void
                             */
                            public function index(){
                                return response()->json([], 200);
                            }
                        }
                    EOD;
                    fwrite($file, $content); // used to write to a file.
                    fclose($file);
                }
            }
            /**
             * @todo: create <Models> folder in module
             */
            $model_path = $module_path . "/src/Models";
            $model_name = ucfirst($table_name);
            if (!is_dir($model_path)) mkdir($model_path, 0777, true);
            $model_file = $model_path . '/' . $model_name . ".php";
            if (!is_file($model_file)) {
                $file = fopen($model_file, "w");
                $content = <<<EOD
                        <?php

                        namespace Modules\\{$module_name}\\Models;

                        use Modules\Core\Models\ModelBase;
                        use Illuminate\Database\Eloquent\SoftDeletes;

                        /**
                         * @author <hauvo1709@gmail.com>
                         * @package Model
                         * @copyright 2022 http://www.cayluaviet.online/
                         * @license License 1.0
                         * @version Release: 1.00.000
                         * @link http://www.docs.v1.cayluaviet.online/
                         * @since {$current_datetime}
                         */
                        class {$model_name} extends ModelBase {

                            use SoftDeletes;

                            protected \$connection = "mysql";

                            protected \$table = "{$table_name}";

                            /**
                             * The attributes that are mass assignable.
                             *
                             * @var array
                             */
                            protected \$fillable = [];
                        }
                    EOD;
                fwrite($file, $content);
                fclose($file);
            }
            /**
             * @todo: create <metadata> folder in module
             */
            $metadata_path = $module_path . "/metadata";
            if (!is_dir($metadata_path)) mkdir($metadata_path, 0777, true);
            /**
             * @todo: create <databases> folder in module/metadata
             */
            $db_dir = $metadata_path . "/databases";
            if (!is_dir($db_dir)) mkdir($db_dir, 0777, true);
            /**
             * @todo: create <layouts> folder in module/metadata
             */
            $layout_dir = $metadata_path . "/layouts";
            if (!is_dir($layout_dir)) mkdir($layout_dir, 0777, true);
            /**
             * @todo: create <database_structures> file in module/metadata
             */
            $model_name = strtolower($model_name);
            $data_structures_name = $model_name . "_database_structures.ini.php";
            $data_structures_file = $db_dir . "/" . $data_structures_name;
            if (!is_file($data_structures_file)) {
                $file = fopen($data_structures_file, "w");
                $content = <<<EOD
                    <?php
                    return [
                        "{$model_name}" => [
                            'fields' => [],
                            'indexes' => []
                        ],
                    ];
                EOD;
                fwrite($file, $content);
                fclose($file);
            }
            return $this->response_base(["status" => true], trans("Module::module.create_database_structures_success"), 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: create new table SQL
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function delete_table(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $module_name = isset($input["module"]) ? ucfirst($input["module"]) : null;
            $table_name = isset($input["name"]) ? strtolower($input["name"]) : null;
            $validator = Validator::make($input, array(
                "name" => "required",
                "module" => "required",
            ));
            if($validator->fails()) return $this->response_base(["status" => false], trans("Module::module.invalid_credentials"), 200);
            $module_path = Core::module_path() . $module_name;

            /**
             * @todo: delete <Model> in module
             */
            $model_path = $module_path . "/src/Models";
            $model_name = ucfirst($table_name);
            $model_file = $model_path . '/' . $model_name . ".php";
             /**
              * @todo: delete *_database_structures.ini.php file
              */
            $metadata_path = $module_path . "/metadata";
            $db_dir = $metadata_path . "/databases";
            $model_name = strtolower($model_name);
            $data_structures_name = $model_name . "_database_structures.ini.php";
            $data_structures_file = $db_dir . "/" . $data_structures_name;
            /**
             * @todo:
             */
            if (is_file($data_structures_file) && is_file($model_file)) {
                if(file_exists($data_structures_file)) {
                    unlink($data_structures_file);
                    unlink($model_file);
                    Schema::dropIfExists($model_name);
                    return $this->response_base(["status" => true], "Table is deleted successfully !!!", 200);
                }
            }
            return $this->response_base(["status" => true], "Table is not found !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: create new column in table SQL
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function create_column(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $module_name = isset($input["module"]) ? ucfirst($input["module"]) : "";
            $table_name = isset($input["table"]) ? strtolower($input["table"]) : "";
            $field_name = isset($input["name"]) ? $input["name"] : "";
            $field_type = isset($input["type"]) ? $input["type"] : "";
            $field_size = isset($input["size"]) ? $input["size"] : "";
            $field_default = isset($input["default"]) ? $input["default"] : "";
            $not_null = isset($input["not_null"]) ? $input["not_null"] : false;
            $metadata_path = Core::module_path() . $module_name . "/metadata/databases";
            $db_file = $metadata_path . "/" . $table_name . '_database_structures.ini.php';
            $database = array();
            if (is_file($db_file)) $database = include $db_file;
            if (empty($field_size)) {
                if (empty($field_default)) {
                    $database[$table_name]["fields"][$field_name] = array(
                        "type" => $field_type,
                        "not_null" => (bool) $not_null,
                    );
                } else {
                    $database[$table_name]["fields"][$field_name] = array(
                        "type" => $field_type,
                        "not_null" => (bool) $not_null,
                        "default" => $field_default,
                    );
                }
            } else {
                if (empty($field_default)) {
                    $database[$table_name]["fields"][$field_name] = array(
                        "type" => $field_type,
                        "size" => (int) $field_size,
                        "not_null" => (bool) $not_null,
                    );
                } else {
                    $database[$table_name]["fields"][$field_name] = array(
                        "type" => $field_type,
                        "size" => (int) $field_size,
                        "not_null" => (bool) $not_null,
                        "default" => $field_default,
                    );
                }
            }
            $export[$table_name] = $database[$table_name];
            $file = fopen($db_file, "w");
            fwrite($file, "<?php\n\n return " . var_export($export, true) . ";\n");
            fclose($file);
            return $this->response_base(["status" => true], trans("Module::module.save_field_success"), 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: update an existing column in table SQL
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function update_column(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $module_name = strtolower($request->get("module"));
            $table_name = strtolower($request->get("table"));
            $field_name = $request->get("field_name");
            $fields = !empty($input[$field_name]) ? $input[$field_name] : [];
            $validator = Validator::make($input, array(
                "table" => "required",
                "module" => "required",
                "field_name" => "required",
            ));
            if($validator->fails()) return $this->response_base(["status" => false], trans("Module::module.invalid_credentials"), 200);
            $database_path = Core::module_path() . $module_name . "/metadata/databases";
            $db_file = $database_path . "/" . $table_name . "_database_structures.ini.php";
            $database = array();
            if (is_file($db_file)) $database = include $db_file;
            if ($fields) {
                if (isset($fields["type"])) {
                    $database[strtolower($table_name)]["fields"][$field_name]["type"] = $fields["type"];
                }
                if (isset($fields["size"])) {
                    $database[strtolower($table_name)]["fields"][$field_name]["size"] = $fields["size"];
                }
                if (isset($fields["not_null"])) {
                    $database[strtolower($table_name)]["fields"][$field_name]["not_null"] = $fields["not_null"];
                }
                if (isset($fields["default"])) {
                    $database[strtolower($table_name)]["fields"][$field_name]["default"] = $fields["default"];
                }
                $export[$table_name] = $database[$table_name];
                $file = fopen($db_file, "w");
                fwrite($file, "<?php\n\n return " . var_export($export, true) . ";\n");
                fclose($file);
            }
            return $this->response_base(["status" => true], trans("Module::module.update_field_success"), 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: delete an existing column in table SQL
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function delete_column(Request $request) {
        if($request->isMethod("post")) {
            $module_name = $request->get("module");
            $table_name = strtolower($request->get("table"));
            $field_name = $request->get("field_name");
            $database_path = Core::module_path() . $module_name . "/metadata/databases";
            $db_file = $database_path . "/" . $table_name . "_database_structures.ini.php";
            $database = array();
            if (is_file($db_file)) $database = include $db_file;
            unset($database[strtolower($table_name)]["fields"][$field_name]);
            $export[$table_name] = $database[$table_name];
            $file = fopen($db_file, "w");
            fwrite($file, "<?php\n\n return " . var_export($export, true) . ";\n");
            fclose($file);
            return $this->response_base(["status" => true], trans("Module::module.delete_field_success"), 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: repair tables belong to module
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function repair_tables(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $validator = Validator::make($input, array(
                "module" => "required",
                "tables" => "required",
            ));
            if($validator->fails()) return $this->response_base(["status" => false], trans("Module::module.invalid_credentials"), 200);
            /**
             * @description: Set the number of seconds a script is allowed to run. If this is reached, the script returns a fatal error.
             * The default limit is 30 seconds or, if it exists, the max_execution_time value defined in the php.ini
             */
            set_time_limit(100000);
            $tables = isset($input["tables"]) ? $input["tables"] : array();
            $module_path = Core::module_path() . ucfirst($input["module"]);
            $databases = array();
            foreach ($tables as $table) {
                if (!empty($table["is_checked"]) && (bool) $table["is_checked"] == true) {
                    $path = $module_path . "/metadata/databases/" . strtolower($table["name"]) . "_database_structures.ini.php";
                    $db_tmp = include $path;
                    $databases = array_merge($databases, $db_tmp);
                }
            }
            $tables = $databases;
            $table_name = "";
            foreach ($tables as $key => $table_data) {
                $table_name = $key;
                $table_language = [];
                $indexes_language = [];
                $table_language_name = $table_name . "_translations";
                if(!empty($table_data["translate"]) && $table_data["translate"] == true) {
                    // extra table language
                    foreach ($table_data["fields"] as $key_field => $field) {
                        if (!empty($field["language"]) && $field["language"] == true) {
                            $table_language[$key_field] = $field;
                            unset($table_data["fields"][$key_field]);
                        }
                    }
                }
                if(!empty($table_language)) {
                    $pk_name = $key . "_id";
                    $table_language[$pk_name] = [
                        "type" => "INTEGER",
                        "size" => 11,
                        "default" => 0,
                        "not_null" => false,
                    ];
                    $table_language["locale"] = [
                        "type" => "VARCHAR",
                        "size" => 50,
                        "default" => 0,
                        "not_null" => false,
                    ];
                    // $this->process_repair_table($table_language_name, $table_language);
                }
                $this->process_repair_table(
                    $table_name,
                    isset($table_data["fields"]) ? $table_data["fields"] : [],
                    !empty($table_data["indexes"]) ? $table_data["indexes"] : []
                );
            }
            return $this->response_base(["status" => true], trans("Module::module.repair_database_success"), 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $table_name
     * @param array $fields
     * @param array $indexes
     * @return void
     */
    protected function process_repair_table($table_name, $fields, $indexes = []) {
        $new_columns = array(
            "columns" => array(
                "user_owner_id" => array(
                    "type" => "INTEGER",
                    "default" => 0,
                    "not_null" => false,
                ),
                "user_created_id" => array(
                    "type" => "INTEGER",
                    "default" => 0,
                    "not_null" => false,
                ),
                "user_updated_id" => array(
                    "type" => "INTEGER",
                    "default" => 0,
                    "not_null" => false,
                ),
                "deleted" => array(
                    "type" => "BOOLEAN",
                    "size" => 1,
                    "default" => 0,
                    "not_null" => true,
                ),
                "deleted_at" => array(
                    "type" => "DATETIME",
                    "not_null" => false,
                ),
            ),
            "indexes" => array(),
        );
        $exists = Schema::connection("mysql")->hasTable($table_name);
        if($exists) {
            $current_fields = Schema::connection("mysql")->getColumnListing($table_name);
            $data_fields = array_merge($new_columns["columns"], $fields);
            foreach($data_fields as $field_name => $options) {
                if(Schema::connection("mysql")->hasColumn($table_name, $field_name)) {
                    Schema::connection("mysql")->table($table_name, function(Blueprint $table) use ($field_name, $options) {
                        $this->detect_field($table, $field_name, $options, "update");
                    });
                } else {
                    Schema::connection("mysql")->table($table_name, function(Blueprint $table) use ($field_name, $options) {
                        $this->detect_field($table, $field_name, $options, "create");
                    });
                }
            }
            if(!empty($indexes)) {
                foreach ($indexes as $index => $index_data) {
                    Schema::connection("mysql")->table($table_name, function(Blueprint $table) use ($table_name, $index, $index_data) {
                        $keyExists = DB::select(DB::raw("SHOW KEYS FROM " . $table_name . "WHERE Key_name=\"" . $index_data["name"] . "\""));
                        if (strtolower($index_data["type"]) == "primary") {
                            // $table->dropPrimary($table_name.'_id_primary');
                            // $table->primary($index_data);
                        } else if (strtolower($index_data["type"]) == "unique") {
                            if(!empty($keyExists)) {
                                $table->dropUnique($index_data["name"]);
                            }
                            $table->unique($index_data["fields"], $index_data["name"]);
                        } else if(strtolower($index_data["type"]) == "index") {
                            if(!empty($keyExists)) {
                                $table->dropIndex($index_data["name"]);
                            }
                            // $table->index($index_data['fields'],$index_data['name']);
                        }
                    });
                }
            }
        } else {
            $new_field = array_merge($new_columns["columns"], $fields);
            Schema::connection("mysql")->create($table_name, function(Blueprint $table) use ($new_field) {
                $table->increments("id");
                $table->timestamps();
                foreach($new_field as $key => $value) {
                    $this->detect_field($table, $key, $value, "create");
                }
            });
            if(!empty($indexes)) { // @param array $indexes
                $new_indexes = array_merge($new_columns["indexes"], $indexes);
            } else {
                $new_indexes = $new_columns["indexes"];
            }
            Schema::connection("mysql")->table($table_name, function(Blueprint $table) use ($new_indexes) {
                foreach ($new_indexes as $index => $index_data) {
                    if(strtolower($index_data["type"]) == "primary") {
                        $table->primary($index_data["fields"], $index_data["name"]);
                    } else if (strtolower($index_data["type"]) == "unique") {
                        $table->unique($index_data["fields"], $index_data["name"]);
                    } else if (strtolower($index_data["type"]) == "index") {
                        $table->index($index_data["fields"], $index_data["name"]);
                    } else if (strtolower($index_data["type"]) == "insrements") {}
                }
            });
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param [type] $table
     * @param [type] $key
     * @param array $value
     * @param string $type
     * @return void
     */
    protected function detect_field($table, $key, $value, $type) {
        if ($type == "create") {
            switch ($value["type"]) {
                case "INTEGER":
                    if(!empty($value["default"])) {
                        $value["default"] = (int) $value["default"];
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->integer($key)->default($value["default"])->unsigned() : $table->integer($key)->default($value["default"])->nullable()->unsigned())
                            : ($value["not_null"] ? $table->integer($key)->default($value["default"]) : $table->integer($key)->default($value["default"])->nullable());
                    } else {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->integer($key)->unsigned() : $table->integer($key)->nullable()->unsigned())
                            : ($value["not_null"] ? $table->integer($key) : $table->integer($key)->nullable());
                    }
                    break;
                case "BIGINT":
                    if(!empty($value["default"])) {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->bigInteger($key)->default($value["default"])->unsigned() : $table->bigInteger($key)->default($value["default"])->nullable()->unsigned())
                            : ($value["not_null"] ? $table->bigInteger($key)->default($value["default"]) : $table->bigInteger($key)->default($value["default"])->nullable());
                    } else {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->bigInteger($key)->unsigned() : $table->bigInteger($key)->nullable()->unsigned())
                            : ($value["not_null"] ? $table->bigInteger($key) : $table->bigInteger($key)->nullable());
                    }
                    break;
                case "BOOLEAN":
                    if(isset($value["default"])) {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->boolean($key)->default($value["default"])) : ($table->boolean($key)->default($value["default"])->nullable());
                    } else {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->boolean($key)) : ($table->boolean($key)->default($value["default"])->nullable());
                    }
                    break;
                case "VARCHAR":
                    if(isset($value["default"])) {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->string($key, $value['size'])->default($value["default"])) : ($table->string($key, $value['size'])->default($value["default"])->nullable());
                    } else {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->string($key, $value['size'])) : ($table->string($key, $value['size'])->nullable());
                    }
                    break;
                case "TEXT":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->text($key)) : ($table->text($key)->nullable());
                    break;
                case "TOKEN":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->rememberToken($key)) : ($table->rememberToken($key)->nullable());
                    break;
                case "DATE":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->date($key)) : ($table->date($key)->nullable());
                    break;
                case "DATETIME":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->dateTime($key)) : ($table->dateTime($key)->nullable());
                    break;
                case "CHAR":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->char($key)) : ($table->char($key)->nullable());
                    break;
                case "JSON":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->json($key)) : ($table->json($key)->nullable());
                    break;
                case "FLOAT":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->float($key)) : ($table->float($key)->nullable());
                    break;
            }
        } else if ($type == "update") {
            switch ($value["type"]) {
                case "INTEGER":
                    if(!empty($value["default"])) {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->integer($key)->default($value["default"])->unsigned()->change() : $table->integer($key)->default($value["default"])->nullable()->unsigned()->change())
                            : ($value["not_null"] ? $table->integer($key)->default($value["default"])->change() : $table->integer($key)->default($value["default"])->nullable()->change());
                    } else {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->integer($key)->unsigned()->change() : $table->integer($key)->nullable()->unsigned()->change())
                            : ($value["not_null"] ? $table->integer($key)->change() : $table->integer($key)->nullable()->change());
                    }
                    break;
                case "BIGINT":
                    if(!empty($value["default"])) {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->bigInteger($key)->default($value["default"])->unsigned()->change() : $table->bigInteger($key)->default($value["default"])->nullable()->unsigned()->change())
                            : ($value["not_null"] ? $table->bigInteger($key)->default($value["default"])->change() : $table->bigInteger($key)->default($value["default"])->nullable()->change());
                    } else {
                        (!empty($value["unsigned"]) && $value["unsigned"] == true) ?
                            ($value["not_null"] ? $table->bigInteger($key)->unsigned()->change() : $table->bigInteger($key)->nullable()->unsigned()->change())
                            : ($value["not_null"] ? $table->bigInteger($key)->change() : $table->bigInteger($key)->nullable()->change());
                    }
                    break;
                case "BOOLEAN":
                    if(isset($value["default"])) {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->boolean($key)->default($value["default"])->change()) : ($table->boolean($key)->default($value["default"])->nullable()->change());
                    } else {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->boolean($key)->change()) : ($table->boolean($key)->default($value["default"])->nullable()->change());
                    }
                    break;
                case "VARCHAR":
                    if(isset($value["default"])) {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->string($key, $value['size'])->default($value["default"])->change()) : ($table->string($key, $value['size'])->default($value["default"])->nullable()->change());
                    } else {
                        (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->string($key, $value['size'])->change()) : ($table->string($key, $value['size'])->nullable()->change());
                    }
                    break;
                case "TEXT":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->text($key)->change()) : ($table->text($key)->nullable()->change());
                    break;
                case "TOKEN":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->rememberToken($key)->change()) : ($table->rememberToken($key)->nullable()->change());
                    break;
                case "DATE":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->date($key)->change()) : ($table->date($key)->nullable()->change());
                    break;
                case "DATETIME":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->dateTime($key)->change()) : ($table->dateTime($key)->nullable()->change());
                    break;
                case "CHAR":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->char($key)->change()) : ($table->char($key)->nullable()->change());
                    break;
                case "JSON":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->json($key)->change()) : ($table->json($key)->nullable()->change());
                    break;
                case "FLOAT":
                    (!empty($value["not_null"]) && $value["not_null"] == true) ? ($table->float($key)->change()) : ($table->float($key)->nullable()->change());
                    break;
            }
        }
    }
}
