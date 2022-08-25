<?php

namespace Modules\Users\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Modules\Users\Interfaces\GroupsRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-23
 */
class GroupsController extends ControllerBase {

    protected $module_name = "Users";
    protected $controller_name = "Groups";
    protected $model_name = "Groups";
    protected $GroupsRepository;

    public function __construct(GroupsRepositoryInterface $GroupsRepository) {
        $this->GroupsRepository = $GroupsRepository;
        parent::__construct();
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
     * @param: \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_config(Request $request) {
        if($request->isMethod("post")) {
            $data = [
                "config" => [
                    "status" => Config::get("module.users.status_list"),
                ]
            ];
            return response()->json($data, 200);
        }
        return $this->response_base([], "Access denied !", 403);
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
            $data_json["groups"] = $this->GroupsRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base([], "Access denied !", 403);
    }
}
