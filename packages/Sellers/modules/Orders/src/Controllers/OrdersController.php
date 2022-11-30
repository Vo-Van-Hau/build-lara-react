<?php

namespace Sellers\Orders\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Sellers\Orders\Interfaces\OrdersRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Sellers\Auth\AuthSellers;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-23
 */
class OrdersController extends ControllerBase {

    protected $OrdersRepository;

    public function __construct(OrdersRepositoryInterface $OrdersRepository) {
        $this->OrdersRepository = $OrdersRepository;
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
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function get_list(Request $request) {
        if ($request->isMethod('get')) {
            $input = $request->all();
            $keyword = isset($input['keyword']) ? $input['keyword'] : '';
            $status = isset($input['status']) ? $input['status'] : [];
            $data_json['orders'] = $this->OrdersRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function get_item(Request $request) {
        if ($request->isMethod('get')) {
            $input = $request->all();
            $id = !empty($input['id']) ? intval($input['id']) : $input['id'];
            if (!empty($input['id']));
            $data_json['orders'] = $this->OrdersRepository->get_by_id($input['id']);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get list orders
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_orders_sellers(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthSellers::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->OrdersRepository->get_orders_sellers($input);
            if($result) {
                foreach($result as $key => $item) {
                    if(!empty($item['order_date'])) {
                        $order_date_item = $item['order_date'];
                        $result[$key]['order_date'] = [
                            'date' => date_format(date_create($order_date_item), 'd-m-Y'),
                            'time' => date_format(date_create($order_date_item), 'H:m:s'),
                        ];
                    }
                }
                return $this->response_base([
                    'status' => true,
                    'orders' => $result
                ], 'You have got orders successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get orders !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}
