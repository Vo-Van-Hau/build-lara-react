<?php

namespace Modules\Payments\Controllers;

use Modules\Core\Controllers\ControllerBase;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-26
 */
class PaymentsController extends ControllerBase {

    public function __construct() {

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function index(){
        return response()->json([], 200);
    }
}