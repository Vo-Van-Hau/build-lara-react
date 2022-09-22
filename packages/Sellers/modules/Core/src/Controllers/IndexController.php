<?php

namespace Sellers\Core\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Sellers\Core\Core;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-22
 */
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
        return view("CoreSellers::index.index", compact("data"));
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
