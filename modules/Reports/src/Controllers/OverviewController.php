<?php

namespace Modules\Reports\Controllers;

use Modules\Core\Controllers\ControllerBase;

class OverviewController extends ControllerBase{

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
