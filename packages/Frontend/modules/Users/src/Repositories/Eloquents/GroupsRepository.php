<?php

namespace Frontend\Users\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Users\Interfaces\GroupsRepositoryInterface;
use Frontend\Core\Models\ModelBase;
use Frontend\Users\Models\Groups;
use Frontend\Users\Models\Users;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class GroupsRepository extends BaseRepository implements GroupsRepositoryInterface {

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
    public function __construct(Groups $model) {
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
            $result = $result->whereRaw("name LIKE \"%" . $keyword. "%\"");
        }
        return $result->with([
                "parent_group:id,parent_group_id,name",
                "users:id,name,username,email,role_id"
            ])
            ->select("id", "name", "status", "parent_group_id", "description")
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
        $new->parent_group_id = $input["parent_group_id"];
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
        $existed->parent_group_id = $input["parent_group_id"];
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
    public function usersbygroup($id){
        return $this->model->where(["id" => $id])
        ->with(["users:id,name,username,email,avatar"])
        ->first("id");
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: add new user to group
     * @param int $group_id
     * @param int $id
     * @return boolean
     */
    public function storage_user_group($group_id, $id) {
        if($id) {
            $existed = Users::find($id);
            $auth_id = AuthFrontend::info("id");
            if(empty($existed)) return false;
            $pivot[$group_id] = array(
                "user_created_id" => $auth_id,
                "user_updated_id" => $auth_id,
                "created_at" => new \DateTime(),
                "updated_at" => new \DateTime(),
                "deleted" => 0,
            );
            $existed->groups()->attach($pivot);
            return true;
        }
        return false;
    }
}
