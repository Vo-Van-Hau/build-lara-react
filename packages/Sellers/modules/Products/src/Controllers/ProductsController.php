<?php

namespace Sellers\Products\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Sellers\Products\Interfaces\ProductsRepositoryInterface;
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
class ProductsController extends ControllerBase {

    protected $ProductsRepository;

    public function __construct(ProductsRepositoryInterface $ProductsRepository) {
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
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function get_list() {
        $list_order = $this->ProductsRepository->get_all();
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get list products
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_products_sellers(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthSellers::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            $result = $this->ProductsRepository->get_products_sellers($input);
            if($result) {
                return $this->response_base([
                    "status" => true,
                    "products" => $result
                ], "You have got products successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to get products !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get list products
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_item(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthSellers::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $input['id'] = isset($input['id']) ? $input['id'] : 0;
            $result = $this->ProductsRepository->get_item($input);
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'item' => $result
                ], 'You have got item successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get item !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo store new product
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function store(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthSellers::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            $result = $this->ProductsRepository->store($input);
            if($result) {
                return $this->response_base([
                    "status" => true,
                    "id" => $result
                ], "You have added a new product successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to add a new product !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo update an existed product
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function update(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthSellers::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            $input['id'] = isset( $input['id']) ? $input['id'] : 0;
            $result = $this->ProductsRepository->update($input['id'], $input);
            if($result) {
                return $this->response_base([
                    "status" => true,
                ], "You have updated an existed product successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to update an existed product !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get all product categories
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_product_categories(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $result = $this->ProductsRepository->get_categories($input);
            if($result) {
                return $this->response_base([
                    "status" => true,
                    "categories" => $result
                ], "You have got data successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to get data !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}
