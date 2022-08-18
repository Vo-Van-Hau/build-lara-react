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
    public static function module_path() {
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

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return string
     */
    public static function assetURL() {
        return url(\Config::get("module.core.mix_backend_asset"));
    }
    /**
     * uploadURL
     *
     * @return string
     */
    public static function uploadURL() {
        return url("");
    }

    /**
     * @return void
     */
    public static function mediaURL() {
        return url(\Config::get("app.url") . "/");
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: The mix()-helper function allows for a second argument, the directory of the manifest file.
     * Just specify it there and it will use the correct manifest file.
     * @param string $source
     * @param string $module
     * @return string
     */
    public static function mix(string $source, string $module) {

        // return asset(mix($source, \Config::get("module.core.mix_backend_asset") . $module));
        return asset(\Config::get("module.core.mix_backend_asset") . $module . "/" . $source);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: return all config
     * @return array
     */
    public static function config() {
        return [
            "app" => [
                "name" => \Config::get("app.name", "Sparrow"),
                "version" => \Config::get('module.core.version', "0.00.000"),
                "baseURL" => url(""),
                "backendURL" => self::backendURL(),
                "assetURL" => self::assetURL(),
                "uploadURL" => self::uploadURL(),
                "mediaURL" => self::mediaURL(),
                "adminPrefix" => \Config::get("module.core.backend_url")
            ]
        ];
    }
}
