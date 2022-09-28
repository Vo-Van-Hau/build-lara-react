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
        if($request->isMethod("post")) {
            $input = $request->all();
            $keyword = isset($input["keyword"]) ? $input["keyword"] : "";
            $status = isset($input["status"]) ? $input["status"] : [];
            $data_json["carts"] = $this->CartsRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new cart
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthFrontend::info("id");
            if(!isset($auth_id)) return $this->response_base(["status" => false], "Access denied !", 200);
            $input["product"] = isset($input["products"]) ? $input["product"] : [];
            $input["user_id"] = $auth_id;
            $result = $this->CartsRepository->store($input);
            if($result) return $this->response_base(["status" => true, $result], "You storage new item successfully !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get cart item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_item(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $id = !empty($input["id"]) ? intval($input["id"]) : "";
            if(empty($id)) return $this->response_base(["status" => false], "Missing ID !!!", 200);
            $data_json["cart"] = $this->CartsRepository->get_by_id($id);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}


