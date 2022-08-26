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

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_parents(Request $request) {
        if ($request->isMethod("post")) {
            $data_json["parents"] = $this->GroupsRepository->all_override();
            return response()->json($data_json, 200);
        }
        return $this->response_base([], "Access denied !", 403);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request) {
        if ($request->isMethod("post")) {
            $input = $request->all();
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            $input["parent_group_id"] = isset($input["parent_group_id"]) ? intval($input["parent_group_id"]) : 0;
            $input["description"] = isset($input["description"]) ? $input["description"] : "";
            $check = $this->checkUnique($input["name"]);
            if(!$check){
                return $this->response_base([], "Group name already exists !!!", 0);
            }
            $result = $this->GroupsRepository->store($input);
            if ($result) return $this->response_base([$result], "You storage new item successfully !!!", 200);
        }
        return $this->response_base([], "Access denied !", 403);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo update group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function update(Request $request){
        if ($request->isMethod("post")) {
            $input = $request->all();
            $id = isset($input["id"]) ? intval($input["id"]) : 0;
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            $input["parent_group_id"] = isset($input["parent_group_id"]) ? intval($input["parent_group_id"]) : 0;
            $input["description"] = isset($input["description"]) ? $input["description"] : "";
             $result = $this->GroupsRepository->update($id, $input);
             if ($result) {
                return $this->response_base([], "You edit item successfully !!!", 200);
             }
             else {
                return $this->response_base([], "You have failed to update !!!", 0);
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
        $count = $this->GroupsRepository->findbyname($name);
        if(empty($count)) return true;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo destroy group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function destroy(Request $request){
        if ($request->isMethod("post")) {
            $input = request()->all();
            $id = isset($input["id"]) ? intval($input["id"]) : "";
            try {
                $result = $this->GroupsRepository->destroy($id);
                if ($result) return $this->response_base([], "You deleted this item successfully !!!", 200);
            } catch (\Exception $errors) {
                return $this->response_base([], "You have failed to delete !!!", 0);
            }
        }
        return $this->response_base([], "Access denied !", 403);
    }
}
