<?php

namespace Sellers\Sellers\Controllers;

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
 * @since 2022-10-09
 */
class SellersController extends ControllerBase {

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
                    "orders" => $result
                ], "You have got history successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to get history !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}
