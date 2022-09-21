<?php

namespace Modules\Core\Controllers\Traits;

/**
 * @author <hauvo1709@gmail.com>
 * @package Trait
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-11
 */
trait BasicController {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: array to options
     * @param array $array
     * @return void
     */
    protected function array_to_options($array) {
        $formatted = [];
        foreach($array as $key => $value) {
            if(is_array($value)) {
                if(isset($option["id"]) && isset($option["name"])) {
                    $formatted[] =  [
                        "label" => $option["name"],
                        "value" => $option["id"]
                    ];
                }
            } else {
                if($value === true) {$value = $key;}
                $formatted[] =  [
                    "label" => $value,
                    "value" => $key
                ];
            }
        }
        return $formatted;
    }

     /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $dir
     * @param array $blacklist
     * @return void
     */
    protected function get_target_path($dir, $blacklist) {
        $list = [];
        if (is_dir($dir)) {
            if($handle = opendir($dir)) { // Open a known directory, and proceed to read its contents
                while(false !== ($file = readdir($handle))) { // Read entry from directory handle
                    if(!in_array($file, $blacklist)) {
                        $list[] = $file;
                    }
                }
                closedir($handle);
            }
        }
        return $list;
    }
}
