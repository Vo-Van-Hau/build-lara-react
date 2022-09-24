<?php

namespace Sellers\Auth\Controllers\Traits;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Sellers\Core\Core;

/**
 * @author <hauvo1709@gmail.com>
 * @package Traits
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-23
 */
trait Auth {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Build session login
     * @return boolean
     */
    public function build_session() {
        if (empty(\Auth::guard(Config::get("module.auth.guard", "module"))->check())) return false;
        $user = \Auth::guard(Config::get("module.auth.guard", "module"))->getUser();
        $acl_list = array();
        if(!empty($user->roles)) {
            foreach($user->roles->acl_role as $key => $item) {
                if (empty($acl_list[$item->module_name])) {
                    $acl_list[$item->module_name] = [];
                }
                if (empty($acl_list[$item->module_name][$item->component_name])) {
                    $acl_list[$item->module_name][$item->component_name] = [];
                }
                $acl_list[$item->module_name][$item->component_name] = $item->getAttributes();
                $extend_permission = $item->extend_permission;
                if($extend_permission){
                    $extend_permission = json_decode($extend_permission, true);
                    foreach($extend_permission as $key => $value){
                        $acl_list[$item->module_name][$item->component_name][$key] = $value;
                    }
                }
            }
        }

        $module_path = Core::module_path();
        $menu_acl = array();
        $permission_array = [
            1 => "All",
            2 => "Groups",
            3 => "Owners",
        ];
        $group = "main";
        foreach (glob($module_path . "/*", GLOB_ONLYDIR) as $dir) {
            $folder = basename($dir);
            $composer_path = $module_path . $folder . "/package.json";
            $config = [];
            if (file_exists($composer_path)) {
                $config = json_decode(file_get_contents($composer_path));
            }

            if (!empty($config->status) && $config->status == true) {
                if (!empty($config->menu)) {
                    $menus = $config->menu;
                    if ($user->is_admin) {
                        foreach ($menus as $key_menu => $menu) {
                            $group = !empty($menu->group) ? $menu->group : "";
                            $menu_acl[$group][$key_menu] = array();
                            $menu_acl[$group][$key_menu]["name"] = !empty($menu->name) ? $menu->name : "";
                            $menu_acl[$group][$key_menu]["icon"] = !empty($menu->icon) ? $menu->icon : "";
                            $menu_acl[$group][$key_menu]["link"] = !empty($menu->link) ? $menu->link : "";
                            $menu_acl[$group][$key_menu]["position"] = !empty($menu->position) ? $menu->position : 0;
                            $menu_acl[$group][$key_menu]["controller"] = !empty($menu->controller) ? $menu->controller : "";
                            $menu_acl[$group][$key_menu]["group"] = $group;
                            $child_menus = !empty($menu->child) ? $menu->child : [];
                            foreach ($child_menus as $key_child => $child_menu) {
                                $menu_acl[$group][$key_menu]["child"][] = (array) $child_menu;
                            }
                        }
                    } else {
                        foreach ($menus as $key_menu => $menu) {
                            if (!empty($acl_list[$key_menu])) {
                                $group = !empty($menu->group) ? $menu->group : "";
                                $menu_acl[$group][$key_menu] = array();
                                $menu_acl[$group][$key_menu]["name"] = !empty($menu->name) ? $menu->name : "";
                                $menu_acl[$group][$key_menu]["icon"] = !empty($menu->icon) ? $menu->icon : "";
                                $menu_acl[$group][$key_menu]["link"] = !empty($menu->link) ? $menu->link : "";
                                $menu_acl[$group][$key_menu]["position"] = !empty($menu->position) ? $menu->position : "";
                                $menu_acl[$group][$key_menu]["controller"] = !empty($menu->controller) ? $menu->controller : "";
                                $menu_acl[$group][$key_menu]["group"] = $group;
                                $child_menus = !empty((array)$menu->child) ? $menu->child : [];
                                $action_mapping = Config::get("module." . strtolower($folder) . ".map_acl_action_list", Config::get("module.core.map_acl_action_list", []));
                                foreach ($child_menus as $key_child => $child_menu) {
                                    if (!empty($child_menu->controller)) {
                                        $component = ucfirst($child_menu->controller);
                                        if (!empty($acl_list[$key_menu][$component])) {
                                            $action = isset($action_mapping[$child_menu->role]) ? $action_mapping[$child_menu->role] : $child_menu->role;
                                            $acl = $acl_list[$key_menu][$component];
                                            if (!empty($acl[$action]) && !empty($permission_array[$acl[$action]])) {
                                                $menu_acl[$group][$key_menu]["child"][] = (array) $child_menu;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        foreach ($menu_acl as $key => $menu) {
            usort($menu, function ($item1, $item2) {
                return $item1["position"] >= $item2["position"];
            });
            $menu_acl[$key] = $menu;
        }
        $user->menu_acl = $menu_acl;
        $user->acl_list = $acl_list;
        $users_of_groups = DB::connection("mysql")->table("user_group")
            ->select("user_group.user_id")
            ->join("groups", "user_group.group_id", "=", "groups.id")
            ->whereRaw("groups.id IN (
                    SELECT group_id FROM user_group WHERE user_id = \"" . $user->id . "\"
                )
                OR groups.parent_group_id IN (
                    SELECT group_id FROM user_group where user_id = \"" . $user->id . "\"
                )"
            )->get();
        $list_users_of_groups = array();
        foreach ($users_of_groups as $key => $user_gr) {
            $list_users_of_groups[] = $user_gr->user_id;
        }
        $user->user_group = $list_users_of_groups;
        request()->session()->put("auth_module", $user);
        request()->session()->put("user", $user);
        request()->session()->save();
        return true;
    }
}
