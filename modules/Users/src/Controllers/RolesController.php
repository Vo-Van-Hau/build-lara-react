<?php

namespace Modules\Users\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Modules\Users\Interfaces\RolesRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-22
 */
class RolesController extends ControllerBase {

    protected $module_name = "Users";
    protected $controller_name = "Roles";
    protected $model_name = "Roles";
    protected $RolesRepository;

    public function __construct(RolesRepositoryInterface $RolesRepository) {
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

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
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
            $data_json["roles"] = $this->RolesRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base([], "Access denied !", 403);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request){
        if ($request->isMethod("POST")) {
            $input = $request->all();
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            $input["description"] = isset($input["description"]) ? $input["description"] : "";
            $check = $this->checkUnique($input["name"]);
            if(!$check) {
                return $this->response_base([], "Role name already exists !!!", 0);
            }
            $result = $this->RolesRepository->store($input);
            if ($result) {
                return $this->response_base([$result], "You storage new item successfully !!!", 200);
            }
        }
        return $this->response_base([], "Access denied !", 403);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo update role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function update(Request $request){
        if($request->isMethod("post")) {
            $input = $request->all();
            $id = isset($input["id"]) ? intval($input["id"]) : 0;
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            $input["description"] = isset($input["description"]) ? $input["description"] : "";
            $result = $this->RolesRepository->update($id, $input);
            if ($result) {
                return $this->response_base([], "You edit item successfully !!!", 200);
            }
        }
        return $this->response_base([], "Access denied !", 403);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo check unique name
     * @param string $name
     * @return void
     */
    public function checkUnique($name){
        $count = $this->RolesRepository->findbyname($name);
        if(empty($count)) return true;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo update role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function destroy(Request $request){
        if ($request->isMethod("post")) {
            $input = request()->all();
            $id = isset($input["id"]) ? intval($input["id"]) : "";
            try {
                $result = $this->RolesRepository->destroy($id);
                if ($result) {
                    return $this->response_base([], "You deleted this item successfully !!!", 200);
                }
            } catch (\Exception $errors) {}
        }
        return $this->response_base([], "Access denied !", 403);
    }
}
