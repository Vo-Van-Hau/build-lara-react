<?php

namespace Frontend\Orders\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Orders\Interfaces\OrdersRepositoryInterface;
use Frontend\Auth\AuthFrontend;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-29
 */
class OrdersController extends ControllerBase {

    protected $OrdersRepository;

    public function __construct(OrdersRepositoryInterface $OrdersRepository) {
        $this->OrdersRepository = $OrdersRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthFrontend::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            //
            $input["payment_method_id"] = isset($input["payment_method_id"]) ? $input["payment_method_id"] : null;
            $input["shipping_method_id"] = isset($input["shipping_method_id"]) ? $input["shipping_method_id"] : null;
            $result = $this->OrdersRepository->store($input);
            if($result) return $this->response_base(["status" => true], "You have ordered successfully !!!", 200);
            return $this->response_base(["status" => false], "You have failed to order !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}


