<?php

namespace Sellers\Dashboard\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Sellers\Orders\Interfaces\OrdersRepositoryInterface;
use Sellers\Products\Interfaces\ProductsRepositoryInterface;
use Sellers\Auth\AuthSellers;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-11-10
 */
class DashboardController extends ControllerBase {

    protected OrdersRepositoryInterface $OrdersRepository;
    protected ProductsRepositoryInterface $ProductsRepository;

    public function __construct(
        OrdersRepositoryInterface $OrdersRepository,
        ProductsRepositoryInterface $ProductsRepository
    ) {
        $this->OrdersRepository = $OrdersRepository;
        $this->ProductsRepository = $ProductsRepository;
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

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: get overview in sellers dashboard
     * @param:
     * @return void
     */
    public function get_overview(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthSellers::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result['products'] = $this->ProductsRepository->get_products_sellers_overview($input);
            $result['orders'] = $this->OrdersRepository->get_orders_sellers_overview($input);
            $result['revenues'] = [
                'all' => $this->get_all_revenue($result['orders']['data'] ?? []),
                'today' => $this->get_today_revenue($result['orders']['data'] ?? []),
            ];
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'overview' => $result
                ], 'You have got orders successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get data !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param:
     * @return void
     */
    public function get_all_revenue($orders) {
        $result = 0;
        foreach($orders as $order) {
            $result += $order->total_amount;
        }
        return $result;
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param:
     * @return void
     */
    public function get_today_revenue($orders) {
        $result = 0;
        foreach($orders as $order) {
            $order_date = $order->order_date;
            $today = [
                'start' => date('Y-m-d 00:00:00'),
                'end' => date('Y-m-d 23:59:59')
            ];
            if($order_date <= $today['end'] && $order_date >= $today['start']) {
                $result += $order->total_amount;
            }
        }
        return $result;
    }
}
