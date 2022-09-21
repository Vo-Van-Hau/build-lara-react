<?php

return [

    "namespace"     => "Core",
    "version"       => "1.00.000",

    /*
    |--------------------------------------------------------------------------
    | Application BackendURL
    |--------------------------------------------------------------------------
    |
    */
    "frontend_url" => env("APP_FRONTEND_URL", "shopping"),
    "backend_url" => env("APP_BACKEND_URL", "admin"),
    "sellers_url" => env("APP_SELLERS_URL", "sellers"),

    /*
    |--------------------------------------------------------------------------
    | Application API BackendURL
    |--------------------------------------------------------------------------
    |
    */
    "api_url" => env("CORE_API_URL", "api"),

    /*
    |--------------------------------------------------------------------------
    | Mix Path
    |--------------------------------------------------------------------------
    |
     */
    "mix_frontend_asset" => env("MIX_FRONTEND_ASSET", "frontend"),
    "mix_backend_asset" => env("MIX_BACKEND_ASSET", "backend"),
    "mix_sellers_asset" => env("MIX_SELLERS_ASSET", "sellers"),

    "locales" => ["en", "vn"],

    "map_acl_action_list" => array(
        "list" => "list",
        "index" => "list",
        "edit" => "edit",
        "upload" => "edit",
        "detail" => "view",
        "ajax_list_relate" => "view",
        "ajax_save_select_relate" => "edit",
        "ajax_subpanel_list" => "edit",
        "create" => "create",
        "delete" => "delete",
    ),
];
