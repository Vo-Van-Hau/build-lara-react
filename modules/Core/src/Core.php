<?php

namespace Modules\Core;

class Core {

    /**
     * Constructor.
     */
    public function __construct() {}
    
    /**
     * return path module
     *
     * @return void
     */
    public static function modulePath() {

        return base_path("modules/");
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: backend url
     * @return string
     */
    public static function backendURL() {

        return \Config::get("app.url") . '/' . \Config::get("module.core.backend_url");
    }
}
