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

    public function get_all($keyword = "", $status = []){
        $result = $this->model->where(["deleted" => 0])->select(["id as value", "name as text"])->get();
        return $result;
    }
}
