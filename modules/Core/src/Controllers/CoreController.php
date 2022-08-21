<?php

namespace Modules\Core\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Modules\Core\Exceptions\ApiException;
use Modules\Core\Trails\Locates;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-07-21
 */
class CoreController extends ControllerBase {

    use Locates;

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function get_module() {
        $module_path = \Modules\Core\Core::module_path();
        $dirs = [];
        foreach (glob($module_path . "/*", GLOB_ONLYDIR) as $dir) {
            $folder = basename($dir);
            $composer_path = $module_path . $folder . "/package.json";
            $config = [];
            if (file_exists($composer_path)) {
                $config = json_decode(file_get_contents($composer_path));
            }
            if (!empty($config->status) && $config->status == true) {
                $dirs[] = array(
                    "name" => $folder,
                    "module_name" => !empty($config->name) ? $config->name : "",
                    "version" => !empty($config->version) ? $config->version : "",
                );
            }
        }
        $menu_acl = (Array) $dirs;
        return response()->json([
                "status" => true,
                "config" => \Modules\Core\Core::config(),
                "modules" => $dirs,
                "menus" => $menu_acl,
                "language" => [
                    "locale" => app()->getLocale(),
                    "locales" => \Config::get("module.core.locales", []),
                    "lang" => $this->translations("Core"),
                ],
            ], 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    protected function redirectTo(){
        return \Core::backendURL() . "/dashboard";
    }
}
