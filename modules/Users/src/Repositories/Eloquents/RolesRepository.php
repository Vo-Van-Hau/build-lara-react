<?php

namespace Modules\Users\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Users\Interfaces\RolesRepositoryInterface;
use Modules\Core\Models\ModelBase;
use Modules\Users\Models\Roles;
use Illuminate\Support\Facades\Config;

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
}
