<?php

namespace Sellers\Products\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Sellers\Orders\Interfaces\OrdersRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-23
 */
class ProductsController extends ControllerBase {

    protected $OrdersRepository;

    public function __construct(OrdersRepositoryInterface $OrdersRepository)
    {
        $this->OrdersRepository = $OrdersRepository;
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
    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function get_list()
    {
        $list_order = $this->OrdersRepository->get_all();
        dd($list_order);
        // return response()->json($list_order, 200);
    }
}
