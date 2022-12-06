<?php

namespace Sellers\Sellers\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Sellers\Interfaces\SellersRepositoryInterface;
use Sellers\Sellers\Models\Sellers;
use Illuminate\Support\Facades\Config;

class SellersRepository extends BaseRepository implements SellersRepositoryInterface {

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
    public function __construct(Sellers $model) {
        $this->model = $model;
    }



    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []) {
        $result = $this->model->where(["deleted" => 0]);
        if (!empty($status)) {
            $result = $result->whereIn("status", $status);
        }
        return $result
            ->paginate(Config::get("packages.sellers.orders.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function store($input = []) {
        try {
            $this->model->user_id = $input['user_id'];
            $this->model->fullname = $input['fullname'];
            $this->model->phone = $input['phone'];
            $this->model->date_of_birth = $input['date_of_birth'];
            $this->model->user_created_id = $input['user_id'];
            $this->model->user_updated_id = $input['user_id'];
            $this->model->user_owner_id = $input['user_id'];
            $this->model->created_at = $input['created_at'];
            $this->model->updated_at = $input['updated_at'];
            if($this->model->save()) {
                return $this->model;
            }
            return false;
        }
        catch (Exception $errors) {
            return $errors->getMessage();
        }
    }
}
