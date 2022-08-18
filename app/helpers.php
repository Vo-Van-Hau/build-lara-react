<?php

if (!function_exists("app_url")) {
    function app_url() {
        if(app()->runningInConsole()){
            return env("APP_URL", "http://localhost");
        }
        $url = request()->root();
        $url = str_replace(["http://","https://"], "", $url);
        $list_url = env("APP_MULTI_URL", "");
        $list_url = explode("|", $list_url);
        if(($index = array_search($url, $list_url)) !== false){
            // && env("APP_ENV") == "production"
            $url = $list_url[$index];

            return "https://" . $url;
        }
        return env("APP_URL", "http://localhost");
    }
}

