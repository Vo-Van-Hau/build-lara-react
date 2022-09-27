<?php

namespace Frontend\Products\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Products\Interfaces\ProductsRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-27
 */
class ProductsController extends ControllerBase {

    protected $ProductsRepository;

    public function __construct(ProductsRepositoryInterface $ProductsRepository) {
        $this->ProductsRepository = $ProductsRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_list(Request $request) {
        if($request->isMethod("post")) {
            // $input = $request->all();
            // $keyword = isset($input["keyword"]) ? $input["keyword"] : "";
            // $status = isset($input["status"]) ? $input["status"] : [];
            // $data_json["carts"] = $this->CartsRepository->get_all($keyword, $status);
            // return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get product item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_item(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $id = !empty($input["id"]) ? intval($input["id"]) : "";
            if(empty($id)) return $this->response_base(["status" => false], "Missing ID !!!", 200);
            $data_json["product"] = $this->ProductsRepository->get_by_id($id);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}


