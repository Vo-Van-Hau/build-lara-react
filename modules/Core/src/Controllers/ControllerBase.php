<?php

namespace Modules\Core\Controllers;

use App\Http\Controllers\Controller;

class ControllerBase extends Controller {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @param string $message
     * @param int $status
     * @return void
     */
    protected function response($data = [], $message = "Succcees!", $status = 200) {
        return response()->json([
            "status" => true,
            "status"  => $message,
            "data" => $data
        ], $status);
    }
}
