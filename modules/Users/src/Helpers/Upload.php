<?php
namespace Modules\Users\Helpers;
use Illuminate\Support\Facades\Storage;
use Exception;

/**
 * @author <hauvo1709@gmail.com>
 * @package Helper
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-28
 */
class Upload {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $folder_name
     * @param mixed $file
     * @param string $file_name
     * @return mixed
     */
    public static function storage($folder_name, $file, $file_name){
        $file_name = time() . "_" . self::unicode_str_filter($file_name);
        try {
            $patch = Storage::disk("public_local")->putFileAs($folder_name, $file, $file_name);
            if($patch) return $patch;
        } catch (Exception $err) {
            return false;
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $str
     * @return string
     */
    public static function unicode_str_filter($str){
        $unicode = array(
            "a" => "á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ",
            "d" => "đ",
            "e" => "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ",
            "i" => "í|ì|ỉ|ĩ|ị",
            "o" => "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ",
            "u" => "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự",
            "y" => "ý|ỳ|ỷ|ỹ|ỵ",
            "A" => "Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ",
            "D" => "Đ",
            "E" => "É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ",
            "I" => "Í|Ì|Ỉ|Ĩ|Ị",
            "O" => "Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ",
            "U" => "Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự",
            "Y" => "Ý|Ỳ|Ỷ|Ỹ|Ỵ",
            "-" => " ",
        );
        foreach ($unicode as $nonUnicode => $uni) {
            $str = preg_replace("/($uni)/i", $nonUnicode, $str);
        }
        return strtolower($str);
    }
}
