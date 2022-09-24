<?php

namespace Frontend\Users\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Users\Interfaces\RolesRepositoryInterface;
use Frontend\Core\Models\ModelBase;
use Frontend\Users\Models\Roles;
use Frontend\Users\Models\Users;
use Frontend\Users\Models\Acl_role;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class RolesRepository extends BaseRepository implements RolesRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Roles $model) {
        $this->model = $model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return Illuminate\Support\Collection
     */
    public function all_override(){
        $result = $this->model->where(["deleted" => 0])->select(["id as value", "name as text"])->get();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []){
        $result = $this->model->where(["deleted" => 0]);
        if(!empty($status)){
            $result = $result->whereIn("status", $status);
        }
        if($keyword != ""){
            $result = $result->whereRaw("name LIKE \"%".$keyword."%\"");
        }
        return $result->with(["users:id,name,username,email,role_id"])
                ->select("id", "name", "status", "description")
                ->paginate(Config::get("module.users.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function store($input = []){
        $new = $this->model;
        $new->name = $input["name"];
        $new->status = $input["status"];
        $new->description = $input["description"];
        if($new->save()) return $new;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @param array $input
     * @return boolean
     */
    public function update($id, $input = []){
        $existed = $this->model->find($id);
        if(empty($existed)) return false;
        $existed->name = $input["name"];
        $existed->status = $input["status"];
        $existed->description = $input["description"];
        return $existed->update(); // return boolean
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $name
     * @return int
     */
    public function findbyname($name = ""){
        $result = $this->model->where(["name" => $name])->count();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return mixed
     */
    public function destroy($id = null) {
        $existed = $this->model->find($id);
        if(empty($existed)) return false;
        return $existed->delete();
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return mixed
     */
    public function usersbyrole($id){
        $existed = $this->model->where(["id" => $id])
            ->with(["users:id,name,username,email,role_id,avatar"])
            ->first("id");
        return $existed;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: add new user to role
     * @param int $role_id
     * @param int $id
     * @return boolean
     */
    public function storage_user_role($role_id, $id){
        $existed = Users::find($id);
        if(empty($existed)) return false;
        $existed->role_id = $role_id;
        return $existed->update();
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $module
     * @param string $component
     * @param int $role_id
     * @return Illuminate\Support\Collection
     */
    public function get_acl_role($module = "", $component = "", $role_id = 0) {
        $acl_role = Acl_role::where([
                "module_name" => $module,
                "component_name" => $component,
                "role_id" => $role_id
            ])
            ->select(["id", "edit", "list", "view", "save", "delete", "extend_permission"])
            ->first();
        return $acl_role;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @param array $data
     * @return boolean
     */
    public function storage_acl($id, $data=[]) {
        $type = $data["type"];
        $status = false;
        $auth_id = AuthFrontend::info("id");
        if($type == "default"){
            $status = Acl_role::updateOrInsert(
                array(
                    "module_name" => $data["module_name"],
                    "component_name" => $data["component_name"],
                    "role_id" => $data["role_id"],
                ),
                array(
                    $data["action"] => $data["value"],
                    "user_created_id" => $auth_id,
                    "user_updated_id" => $auth_id,
                    "user_owner_id" => $auth_id,
                    "created_at" => new \DateTime(),
                    "updated_at" => new \DateTime(),
                )
            );
        } else { // extends
            $existed = Acl_role::where([
                "module_name" => $data["module_name"],
                "component_name" => $data["component_name"],
                "role_id" => $data["role_id"],
            ])->first();
            if(empty($existed)) {
                $new = new Acl_role();
                $new->module_name = $data["module_name"];
                $new->component_name = $data["component_name"];
                $new->role_id = $data["role_id"];
                $new->extend_permission = json_encode(array($data["action"] => $data["value"]));
                $new->user_created_id = $auth_id;
                $new->user_updated_id = $auth_id;
                $new->user_owner_id = $auth_id;
                $new->created_at = new \DateTime();
                $new->updated_at = new \DateTime();
                return $new->save();
            }
            $extend_permission = $existed->extend_permission;
            if($extend_permission) {
                $extend_permission = json_decode($extend_permission, true);
                $extend_permission[$data["action"]] = $data["value"];
            } else {
                $extend_permission = array();
                $extend_permission[$data["action"]] = $data["value"];
            }
            $existed->extend_permission = json_encode($extend_permission);
            return $existed->update();
        }
        return $status;
    }
}
