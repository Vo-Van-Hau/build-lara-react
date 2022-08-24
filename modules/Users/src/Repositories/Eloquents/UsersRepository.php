<?php

namespace Modules\Users\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Users\Interfaces\UsersRepositoryInterface;
use Modules\Core\Models\ModelBase;
use Modules\Users\Models\Users;
use Illuminate\Support\Facades\Config;
use Modules\Auth\AuthCMS;

class UsersRepository extends BaseRepository implements UsersRepositoryInterface {

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
    public function __construct(Users $model) {
        $this->model = $model;
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
        $user = AuthCMS::info();
        $result = $this->model->where([
            "deleted" => 0,
            "is_publisher" => 0
        ]);
        $acl = AuthCMS::get_acl();
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
}
