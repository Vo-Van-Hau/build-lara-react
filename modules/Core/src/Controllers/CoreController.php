<?php
namespace Modules\Core\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Modules\Core\Exceptions\ApiException;

class CoreController extends ControllerBase {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function get_modules() {

        $module_path = \Core::modulePath();
        $dirs = [];
        foreach (glob($module_path . "/*", GLOB_ONLYDIR) as $dir) {
            $folder = basename($dir);
            $packagePath = $module_path . $folder . "/package.json";
            $config = [];
            if (file_exists($packagePath)) {
                $config = json_decode(file_get_contents($packagePath));
            }
            if (!empty($config->status) && $config->status == true) {
                $dirs[] = array(
                    "name" => $folder,
                    "module_name" => !empty($config->name) ? $config->name : "",
                    "version" => !empty($config->version) ? $config->version : "",
                );
            }
        }

        return response()->json([
                "status" => true,
                "config" => \Core::config(),
                "modules" => $dirs
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
