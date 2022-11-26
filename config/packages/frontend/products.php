<?php

return [

    'namespace'     => 'ProductsFrontend',
    'version'       => '1.00.000',

    /*
    |--------------------------------------------------------------------------
    | Application BackendURL
    |--------------------------------------------------------------------------
    |
    */
    'frontend_url' => env('APP_FRONTEND_URL', 'shopping'),
    'item_per_page' => 10,
    'item_per_home' => 60,
    'limit_similar_products' => 36,
];
