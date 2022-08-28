<?php

namespace Modules\Users\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Modules\Users\Requests\UsersRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Modules\Auth\AuthCMS;
use Modules\Core\Exceptions\ApiException;
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
                    "status" => config("module.users.status_list"),
                    "account_type" => config("module.users.is_publisher"),
                    "users_type" => config("module.users.users_type"),
                    "currencies" => config("module.users.currencies"),
                    "roles" => $this->RolesRepository->all_override(),
                    "user" => AuthCMS::info(),
                ]
            ];
            return response()->json($data, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
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
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_groups(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $keyword = isset($input["keyword"]) ? $input["keyword"] : "";
            $data_json["groups"] = $this->UsersRepository->get_groups($keyword);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_publishers(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $keyword = isset($input["keyword"]) ? $input["keyword"] : "";
            $data_json["publishers"] = $this->UsersRepository->get_publishers($keyword);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: storage new user
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request) {
        if ($request->isMethod("post")) {
            $input = $request->all();
            $validator = Validator::make($input, [
                "name"      => "required",
                "username"  => "required",
                "email"     => "required",
                "password"  => "required",
                "role"      => "required",
                "type"      => "required"
            ], [
                "name.required" => "required!",
                "username.required" => "required!",
                "email.required" => "required!",
                "password.required" => "required!",
                "role.required" => "required!",
                "type.required" => "required!"
            ]);
            if ($validator->fails()) {
                throw new ApiException(trans("Users::users.invalid_credentials"), 0, $validator->getMessageBag()->toArray());
            }
            $check_email = $this->checkUniqueEmail($input["email"]);
            if (!$check_email) return $this->response_base(["status" => false], "Email already exists !!!", 200);
            $check_username = $this->checkUniqueUsername($input["username"]);
            if (!$check_username) return $this->response_base(["status" => false], "Username already exists !!!", 200);
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["username"] = isset($input["username"]) ? $input["username"] : "";
            $input["email"] = isset($input["email"]) ? $input["email"] : "";
            $input["password"] = isset($input["password"]) ? $input["password"] : "";
            $input["role"] = isset($input["role"]) ? intval($input["role"]) : null;
            $input["type"] = isset($input["type"]) ? intval($input["type"]) : null;
            $input["is_publisher"] = isset($input["is_publisher"]) ? $input["is_publisher"] : "";
            $input["status"] = isset($input["status"]) ? change_boolean($input["status"]) : true;
            $input["user_groups"] = isset($input["user_groups"]) ? json_decode($input["user_groups"]) : null;
            $input["user_publishers"] = isset($input["user_publishers"]) ? json_decode($input["user_publishers"]) : null;
            $input["avatar"] = null;
            if ($request->hasFile("avatar")) {
                $file = $request->file("avatar");
                $patch = "uploads/avatar";
                $filename = $file->getClientOriginalName();
                $patch_url = \Modules\Users\Helpers\Upload::storage($patch, $file, $filename);
                if ($patch_url) $input["avatar"] = "/" . $patch_url;
            }
            $result = $this->UsersRepository->store($input);
            if ($result) return $this->response_base(["status" => true], "You storage new item successfully !!!", 200);
            else return $this->response_base(["status" => false], "You have failed to store new item!!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo update group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function update(Request $request){
        if($request->isMethod("post")) {
            $input = $request->all();
            $validator = Validator::make($input, array(
                "name"      => "required",
                "username"  => "required",
                "role"      => "required",
                "type"      => "required"
            ),[
                "name.required" => "required!",
                "username.required" => "required!",
                "role.required" => "required!",
                "type.required" => "required!"
            ]);
            if($validator->fails()) {
                throw new ApiException(trans("Users::users.invalid_credentials"), 0, $validator->getMessageBag()->toArray());
            }
            $id = isset($input["id"]) ? intval($input["id"]) : 0;
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["type"] = isset($input["type"]) ? intval($input["type"]) : null;
            $input["role"] = isset($input["role"]) ? intval($input["role"]) : null;
            $input["user_groups"] = isset($input["user_groups"]) ? json_decode($input["user_groups"]) : null;
            $input["user_publishers"] = isset($input["user_publishers"]) ? json_decode($input["user_publishers"]) : null;
            $input["is_admin"] = isset($input["is_admin"]) ? $input["is_admin"] : "";
            if($input["type"] === 2 || $input["role"] === 6 || $input["is_admin"] === "1"){
                $input["username"] = isset($input["username"]) ? $input["username"] : "";
                $input["password"] = isset($input["password"]) ? $input["password"] : "";
                $input["is_publisher"] = isset($input["is_publisher"]) ? $input["is_publisher"] : "";
                $input["status"] = isset($input["status"]) ? change_boolean($input["status"]) : true;
                $input["avatar"] = null;
                if ($request->hasFile("avatar")) {
                    $file = $request->file("avatar");
                    $patch = "uploads/avatar";
                    $filename = $file->getClientOriginalName();
                    $patch_url = \Modules\Users\Helpers\Upload::storage($patch, $file, $filename);
                    if ($patch_url) $input["avatar"] = "/" . $patch_url;
                }
                $result = $this->UsersRepository->update($id, $input);
                if ($result) 
                    return $this->response_base([
                        "status" => true,
                        "data" => $input
                    ], "You edit item successfully !!!", 200);
                else return $this->response_base(["status" => false], "You have failed to edit item!!!", 200);
            } else {
                $result = $this->UsersRepository->update_user($id, $data);
                if ($result)
                    return $this->response_base([
                        "status" => true,
                        "data" => $input
                    ], "You edit item successfully !!!", 200);
                else return $this->response_base(["status" => false], "You have failed to edit item!!!", 200);
            }
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo destroy user
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function destroy(Request $request) {
        if ($request->isMethod("post")) {
            $input = request()->all();
            $id = isset($input["id"]) ? intval($input["id"]) : "";
            try {
                $result = $this->UsersRepository->destroy($id);
                if ($result) return $this->response_base(["status" => true], "You deleted this item successfully !!!", 200);
            } catch (\Exception $errors) {
                return $this->response_base(["status" => false], "You have failed to delete !!!", 200);
            }
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get user item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_user(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $id = !empty($input["id"]) ? intval($input["id"]) : $id;
            if (empty($id)) return $this->response_base(["status" => false], "Missing ID !!!", 200);
            $data_json["user"] = $this->UsersRepository->get_by_id($id);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo check unique email
     * @param string $email
     * @return boolean
     */
    public function checkUniqueEmail($email) {
        $count = $this->UsersRepository->findbyemail($email);
        if ($count == 0) return true;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo check unique username
     * @param string $email
     * @return boolean
     */
    public function checkUniqueUsername($username) {
        $count = $this->UsersRepository->findbyusername($username);
        if ($count == 0) return true;
        return false;
    }
}
