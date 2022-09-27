<?php

namespace Frontend\Checkout\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Checkout\Interfaces\CartsRepositoryInterface;

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
            // $input["name"] = isset($input["name"]) ? $input["name"] : "";
            // $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            // $input["parent_group_id"] = isset($input["parent_group_id"]) ? intval($input["parent_group_id"]) : 0;
            // $input["description"] = isset($input["description"]) ? $input["description"] : "";
            // $check = $this->checkUnique($input["name"]);
            // if(!$check){
            //     return $this->response_base(["status" => false], "Group name already exists !!!", 200);
            // }
            // $result = $this->GroupsRepository->store($input);
            // if ($result) return $this->response_base(["status" => true, $result], "You storage new item successfully !!!", 200);
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


