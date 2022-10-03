<?php

namespace Frontend\Customer\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Customer\Interfaces\CustomerRepositoryInterface;
use Frontend\Customer\Models\Customer;
use Illuminate\Support\Facades\Config;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface {

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
    public function __construct(Customer $model) {
        $this->model = $model;
        $this->originalModel = $model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $user_id
     * @return Illuminate\Support\Collection
     */
    public function get_by_user_id($user_id) {
        $result = $this->model->where("user_id", $user_id)->with([
            "user"
        ])->first();
        return $result;
    }
}
