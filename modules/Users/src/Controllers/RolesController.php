<?php

namespace Modules\Users\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Modules\Users\Interfaces\RolesRepositoryInterface;
use Modules\Core\Core;

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
    private $exclude_module = [
        "Config", "Auth", "Core", "Module",
        "Themes", "Settings"
    ];

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
            $data_json["roles"] = $this->RolesRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage(Request $request) {
        if ($request->isMethod("POST")) {
            $input = $request->all();
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            $input["description"] = isset($input["description"]) ? $input["description"] : "";
            $check = $this->checkUnique($input["name"]);
            if(!$check) {
                return $this->response_base(["status" => false], "Role name already exists !!!", 200);
            }
            $result = $this->RolesRepository->store($input);
            if ($result) return $this->response_base(["status" => true, $result], "You storage new item successfully !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo update role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function update(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $id = isset($input["id"]) ? intval($input["id"]) : 0;
            $input["name"] = isset($input["name"]) ? $input["name"] : "";
            $input["status"] = isset($input["status"]) ? intval($input["status"]) : "";
            $input["description"] = isset($input["description"]) ? $input["description"] : "";
            $result = $this->RolesRepository->update($id, $input);
            if ($result) {
                return $this->response_base(["status" => true], "You edit item successfully !!!", 200);
            }
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo check unique name
     * @param string $name
     * @return void
     */
    public function checkUnique($name) {
        $count = $this->RolesRepository->findbyname($name);
        if(empty($count)) return true;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo destroy role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function destroy(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $id = isset($input["id"]) ? intval($input["id"]) : "";
            try {
                $result = $this->RolesRepository->destroy($id);
                if ($result) return $this->response_base(["status" => true], "You deleted this item successfully !!!", 200);
            } catch (\Exception $errors) {
                return $this->response_base(["status" => false], "You have failed to delete !!!", 200);
            }
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get all users in role
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_users(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $id = isset($input["id"]) ? intval($input["id"]) : "";
            $data_json["result"] = $this->RolesRepository->usersbyrole($id);
            return response()->json($data_json, 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo add new user to group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function storage_user_to_role(Request $request){
        if($request->isMethod("post")) {
            $input = request()->all();
            $role_id = isset($input["role_id"]) ? intval($input["role_id"]) : "";
            $id = isset($input["user_id"]) ? intval($input["user_id"]) : "";
            $status = $this->RolesRepository->storage_user_role($role_id, $id);
            if($status) return $this->response_base(["status" => true], "You storage new item successfully !!!", 200);
            return $this->response_base(["status" => true], "You storage new item failed!!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get modules, components, action, action range
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_init_acl_role(Request $request) {
        if ($request->isMethod("post")) {
            $actions["default"] = $this->array_to_options(Config::get("module.users.acl_mapping_default", []));
            $action_ranges = $this->array_to_options(Config::get("module.users.acl_list", []));
            $module_path = Core::module_path();
            $module_paths = glob($module_path . "*", GLOB_ONLYDIR);
            $modules = [];
            $components = [];
            for($i = 0; $i < count($module_paths); $i++) {
                $module_name = basename($module_paths[$i]);
                if(!in_array($module_name, $this->exclude_module)) {
                    $extend_permission = Config::get("module." . strtolower($module_name) . ".extend_permission");
                    $extend_permission = $extend_permission ? $extend_permission : [];
                    $actions[$module_name] = $this->array_to_options($extend_permission);
                    $modules[] = [
                        "label" => $module_name,
                        "value" => $module_name
                    ];
                    $controllers = $this->get_target_path($module_paths[$i] . "/src/Controllers", [".", ".."]);
                    foreach($controllers as $key => $value) {
                        if(strpos($value, ".orig") === false) {
                            $component_name = str_replace("Controller.php", "", $value);
                            $components[] = [
                                "label" => $component_name,
                                "value" => $component_name,
                                "module" => $module_name
                            ];
                        }
                    }
                }
            }
            return response()->json([
                "actions" => $actions,
                "action_ranges" => $action_ranges,
                "modules" => $modules,
                "components" => $components,
                "default_none_acl" => Config::get("module.users.default_none_acl", [])
            ]);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_acl_role(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $module_name = isset($input["module_name"]) ? $input["module_name"] : "";
            $component_name = isset($input["component_name"]) ? $input["component_name"] : "";
            $role_id = isset($input["role_id"]) ? intval($input["role_id"]) : "";
            $data_json["acl_role"] = $this->RolesRepository->get_acl_role($module_name, $component_name, $role_id);
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
    public function save_acl_role(Request $request) {
        if($request->isMethod("post")) {
            $input = request()->all();
            $id = isset($input["id"]) ? intval($input["id"]) : 0;
            $input["module_name"] = isset($input["module_name"]) ? $input["module_name"] : "";
            $input["component_name"] = isset($input["component_name"]) ? $input["component_name"] : "";
            $input["action"] = isset($input["action"]) ? $input["action"] : "";
            $input["value"] = isset($input["value"]) ? $input["value"] : "";
            $input["role_id"] = isset($input["role_id"]) ? intval($input["role_id"]) : 0;
            $input["type"] = isset($input["type"]) ? $input["type"] : "default";
            $result = $this->RolesRepository->storage_acl($id, $input);
            if($result) return $this->response_base(["status" => true], "You save item successfully !!!", 200);
            return $this->response_base(["status" => false], "You have failed to save !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}
