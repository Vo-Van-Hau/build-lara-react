<?php

namespace Modules\Users\Models\Traits;

use Illuminate\Support\Facades\DB;

/**
 * @author <hauvo1709@gmail.com>
 * @package Trait
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-21
 */
trait ACL {

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @return void
     */
    public function acl_list() {
        $acl_list = array();
        if (!empty($this->roles)) {
            foreach($this->roles->acl_role as $key => $item) {
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
        return $acl_list;
    }

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo: users_of_groups
     * @return array
     */
    public function users_of_groups(){
        $users_of_groups = DB::connection("mysql")->table("user_group")
            ->select("user_group.user_id")
            ->join("groups", "user_group.group_id", "=", "groups.id")
            ->whereRaw("groups.id IN (SELECT group_id FROM user_group WHERE user_id = \"" . $this->id . "\")
                OR groups.parent_group_id in ( SELECT group_id FROM user_group WHERE user_id = \"" . $this->id . "\")"
            )->get();
        $list_users_of_groups = array();
        foreach ($users_of_groups as $k => $user) {
            $list_users_of_groups[] = $user->user_id;
        }

        return $list_users_of_groups;
    }
}
