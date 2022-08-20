<?php

namespace Modules\Auth\Controllers;

use Modules\Core\Controllers\ControllerBase;

class AuthController extends ControllerBase {

    public function __construct() {

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function index() {
        return response()->json([], 200);
    }
}
