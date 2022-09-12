<?php

return [
    "map_acl_action_list" => array(
        "get_list" => "list",
        "list" => "list",
        "getall" => "list",
        "getUsers" => "list",
        "index" => "list",
        "edit" => "edit",
        "detail" => "view",
        "create" => "edit",
        "delete" => "delete",
        "access" => "access_internal",
        "access_pub" => "access_publisher"
     ),
     "status_list" => array(
        array("value" => 1, "text" => "Active"),
        array("value" => 0, "text" => "Inactive"),
     ),
     "item_per_page" => 10,
     "is_publisher" => array(
        array("value" => 1, "text" => "Publisher"),
        array("value" => 0, "text" => "Internal"),
     ),
     "users_type" => array(
        array("value" => 0, "text" => "All"),
        array("value" => 1, "text" => "Sale"),
        array("value" => 2, "text" => "AdOps"),
        array("value" => 3, "text" => "Admin"),
        array("value" => 4, "text" => "Manager"),
     ),
     "currencies" => array(
        array("value" => "VND", "text" => "VND"),
        array("value" => "USD", "text" => "USD"),
     ),
     "extend_permission" => array(
        "access_internal"   => true,
        "access_publisher"  => true,
     ),
     "acl_list" => array(
        0 => "Denied",
        1 => "All",
        2 => "Owner",
        3 => "Group",
        4 => "None",
     ),
     "acl_mapping_default" => array(
        "list" => true,
        "view" => true,
        "edit" => true,
        "save" => true,
        "delete" => true
     ),
     "default_none_acl" => 0,
];
