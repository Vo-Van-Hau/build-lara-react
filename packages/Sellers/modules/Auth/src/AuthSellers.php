<?php

namespace Sellers\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-23
 */
class AuthSellers {

    /**
     * Constructor.
     */
    public function __construct() {}

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: return guard
     * @return string
     */
    public function get_guard() {
        return Config::get("packages.sellers.auth.guard", "sellers");
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: return user info login
     * @param array $field
     * @return mixed
     */
    public static function info($field = []) {
        if (empty($field)) {
            return Auth::guard((new self)->get_guard())->user();
        }
        return !empty(Auth::guard((new self)->get_guard())->user()->$field) ? Auth::guard((new self)->get_guard())->user()->$field : "";
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get acl
     * @return void
     */
    public static function get_acl() {
        $segments = request()->segments();
        $auth = Auth::guard(Config::get("module.auth.guard", "module"))->getUser();
        $acl_list = [];
        if (!empty($segments[0]) && $segments[0] == "api") {
            $acl_list = $auth->acl_list();
        } else {
            $acl_list = $auth->acl_list();
        }

        $module_name = "Index";
        $controller_name = "Index";
        if (!empty($segments[0]) && $segments[0] == Config::get("module.core.backend_url", "admin") && !empty($segments[1]) && $segments[1] == "api") {
            $module_name = !empty($segments[2]) ? ucfirst($segments[2]) : "Index";
            $controller_name = !empty($segments[3]) ? ucfirst($segments[3]) : "Index";
        }
        $action_method = Route::getCurrentRoute()->getActionMethod(); // $action_method = request()->route()->getActionMethod();
        $configName = "module." . strtolower($module_name) . ".map_acl_action_list";
        $config = Config::get($configName, Config::get("module.core.map_acl_action_list"));
        $action = isset($config[$action_method]) ? $config[$action_method] : $action_method;
        // extend_permission
        $configExtend = "module." . strtolower($module_name) . ".extend_permission";
        $extendPermission = Config::get($configExtend, []);
        if (!empty($extendPermission)) {
            $action = (isset($extendPermission[$action_method]) && $extendPermission[$action_method]) ? $action_method : $action;
        }
        $filter = array();
        if ($auth->is_admin == 1) {
            $filter[] = -1;
        } else if (!empty($acl_list[$module_name][$controller_name][$action])) {
            $permission = $acl_list[$module_name][$controller_name][$action];
            if ($permission == 3) {
                $filter = $auth->users_of_groups(); // For group
            } else if ($permission == 2) {
                $filter[] = $auth->id; // For owner
            } else if ($permission == 1) {
                $filter[] = -1; // For all
            } else {
                $filter[] = 0;
            }
        }
        return $filter;
    }
}
