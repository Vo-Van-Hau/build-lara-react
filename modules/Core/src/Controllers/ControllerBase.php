<?php

namespace Modules\Core\Controllers;

use App\Http\Controllers\Controller;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-07-21
 */
class ControllerBase extends Controller {

    public function __construct() {

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @param string $message
     * @param int $status
     * @return void
     */
    protected function response_base($data = [], $message = "", $status = 200) {
        return response()->json([
            "status" => true,
            "message"  => $message,
            "data" => $data
        ], $status);
    }
}
