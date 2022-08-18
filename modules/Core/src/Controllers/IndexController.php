<?php

namespace Modules\Core\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Modules\Core\Core;

class IndexController extends Controller {

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct() {

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function index() {
        $data = [];
        return view("Core::index.index", compact("data"));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function dynamicRoute() {
        $parameters = request()->route()->parameters;
        $module = !empty($parameters["module"]) ? ucfirst($parameters["module"]) : "Index";
        $controller = !empty($parameters["controller"]) ? ucfirst($parameters["controller"]) : $module;
        $action = !empty($parameters["action"]) ? $parameters["action"] : 'index';
        $param = !empty($parameters["param"]) ? $parameters["param"] : null;
        $controller = app()->make("Modules\\{$module}\\Controllers\\{$controller}Controller");
        return $controller->callAction($action, ["id" => $param]);
    }
}
