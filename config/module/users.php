<?php

return [
    "map_acl_action_list" => array(
        "getlist" => "list",
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
];
