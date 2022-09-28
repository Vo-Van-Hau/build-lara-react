<?php

namespace Frontend\Payments\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Payments\Interfaces\PaymentsRepositoryInterface;
use Frontend\Payments\Models\Payments;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class PaymentsRepository extends BaseRepository implements PaymentsRepositoryInterface {

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
    public function __construct(Payments $model) {
        $this->model = $model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []){

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id){
        $result = $this->model->where("id", $id)->first();
        return $result;
    }
}
