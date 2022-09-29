<?php

namespace Sellers\Orders\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Sellers\Orders\Interfaces\OrdersRepositoryInterface;
use Illuminate\Support\Facades\DB;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-23
 */
class OrdersController extends ControllerBase
{

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
    public function get_list(Request $request)
    {
        if ($request->isMethod("get")) {
            $input = $request->all();
            $keyword = isset($input["keyword"]) ? $input["keyword"] : "";
            $status = isset($input["status"]) ? $input["status"] : [];
            $data_json["orders"] = $this->OrdersRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    public function get_item(Request $request)
    {
        // dd($request);
        if ($request->isMethod("get")) {

            $input = $request->all();
            $id = !empty($input["id"]) ? intval($input["id"]) : $input["id"];
            if (!empty($input["id"]));
            $data_json["orders"] = $this->OrdersRepository->get_by_id($input["id"]);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}