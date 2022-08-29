<?php

namespace Modules\Module\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
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
                        "is_checked" => false,
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
            $name = isset($input["name"]) ? trim($input["name"]) : null;
            if(is_null($name)) return $this->response_base(["status" => false], "You have failed to create new module!!!", 200);
            $validator = Validator::make($input, array(
                "name" => "required",
            ));
            if($validator->fails()) return $this->response_base(["status" => false], trans("Module::module.invalid_credentials"), 200);
            /**
             * @todo: create <Module> folder
             */
            $module_name = ucfirst(strtolower($name));
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
}
