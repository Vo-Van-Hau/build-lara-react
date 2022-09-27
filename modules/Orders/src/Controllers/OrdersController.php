<?php

namespace Modules\Orders\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\DB;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-25
 */
class OrdersController extends ControllerBase
{

    public function __construct()
    {
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function index()
    {
        return response()->json([], 200);
    }
}