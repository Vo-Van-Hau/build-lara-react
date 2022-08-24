<?php

namespace Modules\Users\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Modules\Auth\AuthCMS;
use Modules\Users\Interfaces\UsersRepositoryInterface;
use Modules\Users\Interfaces\GroupsRepositoryInterface;
use Modules\Users\Interfaces\RolesRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-21
 */
class UsersController extends ControllerBase {

    protected $module_name = "Users";
    protected $controller_name = "Users";
    protected $model_name = "Users";
    protected $UsersRepository;
    protected $GroupsRepository;
    protected $RolesRepository;

    public function __construct(
        UsersRepositoryInterface $UsersRepository,
        GroupsRepositoryInterface $GroupsRepository,
        RolesRepositoryInterface $RolesRepository
    ) {
        $this->UsersRepository = $UsersRepository;
        $this->GroupsRepository = $GroupsRepository;
        $this->RolesRepository = $RolesRepository;
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

    public function get_config() {
        $data = [
            "config" => [
                "status" => config("module.users.status_list"),
                "account_type" => config("module.users.is_publisher"),
                "users_type" => config("module.users.users_type"),
                "currencies" => config("module.users.currencies"),
                "roles" => $this->RolesRepository->get_all(),
                "user" => AuthCMS::info(),
            ]
        ];
        return response()->json($data, 200);
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
            $is_publisher = 0;
            $group = isset($input["group"]) ? $data["group"] : [];
            $data_json["users"] = $this->UsersRepository->get_all($keyword, $status, $group);
            return response()->json($data_json, 200);
        }
        else {
            return response()->json([
                "status" => false,
                "message" => "This method is not supported for this route"
            ], 400);
        }
    }
}
