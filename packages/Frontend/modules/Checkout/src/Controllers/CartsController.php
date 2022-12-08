<?php

namespace Frontend\Checkout\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Checkout\Interfaces\CartsRepositoryInterface;
use Frontend\Auth\AuthFrontend;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-27
 */
class CartsController extends ControllerBase {

    protected $CartsRepository;

    public function __construct(CartsRepositoryInterface $CartsRepository) {
        $this->CartsRepository = $CartsRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_list(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $keyword = isset($input['keyword']) ? $input['keyword'] : '';
            $status = isset($input['status']) ? $input['status'] : [];
            $data_json['carts'] = $this->CartsRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new cart
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            if(!isset($auth_id)) return $this->response_base(['status' => false], 'Access denied !', 200);
            $input['product_id'] = isset($input['product_id']) ? $input['product_id'] : null;
            $input['quantity'] = isset($input['quantity']) ? $input['quantity'] : null;
            $input['user_id'] = $auth_id;
            $result = $this->CartsRepository->store($input);
            if($result) return $this->response_base(['status' => true, $result], 'You storage new item successfully !!!', 200);
            return $this->response_base(['status' => false], 'You have false to add new item successfully !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get cart item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_item(Request $request) {
        if($request->isMethod('post')) {
            $input = request()->all();
            $id = !empty($input['id']) ? intval($input['id']) : '';
            if(empty($id)) return $this->response_base(['status' => false], 'Missing ID !!!', 200);
            $data_json['cart'] = $this->CartsRepository->get_by_id($id);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get cart item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_cart(Request $request) {
        if($request->isMethod('post')) {
            $auth_id = AuthFrontend::info('id');
            if(empty($auth_id)) return $this->response_base(['status' => false], 'Missing UserID !!!', 200);
            $data_json['cart'] = $this->CartsRepository->get_by_user_id($auth_id);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: remove product in cart
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function remove_item(Request $request) {
        if($request->isMethod('post')) {
            $auth_id = AuthFrontend::info('id');
            $input = $request->all();
            $input['product_id'] = isset($input['product_id']) ? $input['product_id'] : null;
            $input['cart_id'] = isset($input['cart_id']) ? $input['cart_id'] : null;
            if(empty($auth_id) || is_null($input['product_id']) || is_null($input['cart_id'])) {
                return $this->response_base(['status' => false], 'Missing [User, Product, Cart] ID !!!', 200);
            }
            $input['user_id'] = $auth_id;
            try {
                $result = $this->CartsRepository->remove_item($input);
                if($result) return $this->response_base(['status' => true], 'You deleted this item successfully !!!', 200);
            } catch (\Exception $errors) {
                return $this->response_base(['status' => false], 'You have failed to delete !!!', 200);
            }
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}


