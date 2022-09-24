<?php

namespace Sellers\Users\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Users\Interfaces\UsersRepositoryInterface;
use Sellers\Core\Models\ModelBase;
use Sellers\Users\Models\Users;
use Sellers\Users\Models\Groups;
use Sellers\Publishers\Models\Publishers;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Sellers\Auth\AuthSellers;
use Exception;

class UsersRepository extends BaseRepository implements UsersRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $groups_model;
    protected $publishers_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Users $model, Groups $groups_model, Publishers $publishers_model) {
        $this->model = $model;
        $this->groups_model = $groups_model;
        $this->publishers_model = $publishers_model;
    }

   /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @param array $user_group
     * @param mixed $user_type
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = [], $user_group = [], $user_type = null) {
        $user = AuthSellers::info();
        $result = $this->model->where([
            "deleted" => 0,
            "is_publisher" => 0
        ]);
        $acl = AuthSellers::get_acl();
        if (!empty($acl) && array_search(-1, $acl) === false) {
            $rawCondition = " id IN (" . implode(",", $acl) . ")";
            $result->whereRaw($rawCondition);
        }
        if(!empty($status)){
            $result = $result->whereIn("status", $status);
        }
        if(!empty($user_group)){
            $result = $result->whereIn("id", $user_group);
        }
        if ($user_type !== null) {
            $result = $result->where("type", $user_type);
        }

        if($keyword != ""){
            $result = $result->whereRaw("(username LIKE \"%".$keyword."%\" OR name LIKE \"%".$keyword."%\" OR email LIKE \"%".$keyword."%\")");
        }

        return $result->orderBy("created_at", "DESC")
            ->select("id", "name", "username", "email", "role_id", "status", "avatar", "is_admin", "is_publisher")
            ->with(["roles:id,name", "groups:id,name"])
            ->paginate(Config::get("module.users.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @return Illuminate\Support\Collection
     */
    public function get_groups($keyword = ""){
        $result = $this->groups_model->where(["deleted" => 0, "status" => 1]);
        if($keyword != "") $result = $result->whereRaw("name LIKE \"%" . $keyword . "%\"");
        return $result->orderBy("id", "DESC")
            ->with(["parent_group:id,parent_group_id,name"])
            ->select("id", "name", "status", "parent_group_id", "description")
            ->paginate(Config::get("module.users.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @return Illuminate\Support\Collection
     */
    public function get_publishers($keyword = ""){
        $result = $this->publishers_model->where(["deleted" => 0, "status" => 1]);
        if($keyword != ""){
            $result = $result->whereRaw("name LIKE \"%".$keyword."%\"");
        }
        return $result->orderBy("id", "DESC")
        ->select("id", "name", "status")
        ->paginate(Config::get("module.users.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function store($input = []){
        try {
            $auth_id = AuthSellers::info("id");
            if(empty($auth_id) || is_null($auth_id)) return false;
            $this->model->name         = $input["name"];
            $this->model->username     = $input["username"];
            $this->model->email = $input["email"];
            $this->model->password = Hash::make($input["password"]);
            $this->model->role_id = $input["role"];
            $this->model->type = $input["type"];
            $this->model->status = $input["status"];
            $this->model->is_publisher = $input["is_publisher"];
            $this->model->avatar = $input["avatar"];
            $this->model->user_created_id = $auth_id;
            $this->model->user_updated_id = $auth_id;
            $this->model->user_owner_id = $auth_id;
            if($this->model->save()){
                if(!empty($input["user_groups"])){
                    $groups = $input["user_groups"];
                    foreach($groups as $group){
                        $pivotGroups[$group] = array(
                            "user_created_id" => $auth_id,
                            "user_updated_id" => $auth_id,
                            "user_owner_id" => $auth_id,
                            "created_at" => new \DateTime(),
                            "updated_at" => new \DateTime(),
                            "deleted" => 0,
                        );
                    }
                    if(isset($pivotGroups) && !empty($pivotGroups)) {
                        $this->model->groups()->sync($pivotGroups);
                    }
                }
                if(!empty($input["user_publishers"])){
                    $publishers = $input["user_publishers"];
                    foreach($publishers as $publisher){
                        $pivotPublishers[$publisher] = array(
                            "user_created_id" => $auth_id,
                            "user_updated_id" => $auth_id,
                            "user_owner_id" => $auth_id,
                            "created_at" => new \DateTime(),
                            "updated_at" => new \DateTime(),
                            "deleted" => 0,
                        );
                    }
                    if(isset($pivotPublishers) && !empty($pivotPublishers)) {
                        $this->model->publishers()->sync($pivotPublishers);
                    }
                }
                return $this->model;
            }
            return false;
        }
        catch (Exception $errors) {
            return $errors->getMessage();
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @param array $input
     * @return boolean
     */
    public function update($id, $input = []){
        $auth_id = AuthSellers::info("id");
        if(empty($auth_id) || is_null($auth_id)) return false;
        $existed = $this->model->find($id);
        if(empty($existed)) return false;
        $existed->name          = $input["name"];
        $existed->username      = $input["username"];
        $existed->role_id       = $input["role"];
        $existed->type          = $input["type"];
        $existed->status        = $input["status"];
        $existed->is_publisher  = $input["is_publisher"];
        if($input["password"]) $existed->password = Hash::make($input["password"]);
        if($input["avatar"]) $existed->avatar = $input["avatar"];
        if($existed->update()){
            if(!empty($input["user_groups"])) {
                $groups = $input["user_groups"];
                foreach($groups as $group){
                    $pivotGroups[$group] = array(
                        "user_created_id" => $auth_id,
                        "user_updated_id" => $auth_id,
                        "user_owner_id" => $auth_id,
                        "created_at" => new \DateTime(),
                        "updated_at" => new \DateTime(),
                        "deleted" => 0,
                    );
                }
                if(isset($pivotGroups) && !empty($pivotGroups)) {
                    $existed->groups()->sync($pivotGroups);
                }
            } else {
                $existed->groups()->detach();
            }
            if(!empty($input["user_publishers"])) {
                $publishers = $input["user_publishers"];
                foreach($publishers as $publisher){
                    $pivotPublishers[$publisher] = array(
                        "user_created_id" => $auth_id,
                        "user_updated_id" => $auth_id,
                        "user_owner_id" => $auth_id,
                        "created_at" => new \DateTime(),
                        "updated_at" => new \DateTime(),
                        "deleted" => 0,
                    );
                }
                if(isset($pivotPublishers) && !empty($pivotPublishers)) {
                    $existed->publishers()->sync($pivotPublishers);
                }
            } else {
                $existed->publishers()->detach();
            }
            return true;
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @param array $input
     * @return boolean
     */
    public function update_user($id, $input = []){
        $auth_id = AuthSellers::info("id");
        if(empty($auth_id) || is_null($auth_id)) return false;
        $existed = $this->model->find($id);
        if(empty($existed)) return false;
        $existed->name = $input["name"];
        if($existed->update()){
            if(!empty($input["user_groups"])) {
                $groups = $input["user_groups"];
                foreach($groups as $group){
                    $pivotGroups[$group] = array(
                        "user_created_id" => $auth_id,
                        "user_updated_id" => $auth_id,
                        "user_owner_id" => $auth_id,
                        "created_at" => new \DateTime(),
                        "updated_at" => new \DateTime(),
                        "deleted" => 0,
                    );
                }
                if(isset($pivotGroups) && !empty($pivotGroups)) {
                    $existed->groups()->sync($pivotGroups);
                }
            } else {
                $existed->groups()->detach();
            }
            if(!empty($input["user_publishers"])) {
                $publishers = $input["user_publishers"];
                foreach($publishers as $publisher){
                    $pivotPublishers[$publisher] = array(
                        "user_created_id" => $auth_id,
                        "user_updated_id" => $auth_id,
                        "user_owner_id" => $auth_id,
                        "created_at" => new \DateTime(),
                        "updated_at" => new \DateTime(),
                        "deleted" => 0,
                    );
                }
                if(isset($pivotPublishers) && !empty($pivotPublishers)) {
                    $existed->publishers()->sync($pivotPublishers);
                }
            } else {
                $existed->publishers()->detach();
            }
            return true;
        }
        return false;
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
     * @param string $email
     * @return int
     */
    public function findbyemail($email = ""){
        $result = $this->model->where(["deleted" => 0, "email" => $email])->count();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $username
     * @return int
     */
    public function findbyusername($username = ""){
        $result = $this->model->where(["deleted" => 0, "username" => $username])->count();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id){
        $result = $this->model->where("id", $id)
        ->with([
            "groups.parent_group:id,name,status",
            "publishers:id,name,status"
        ])->first();
        return $result;
    }
}
