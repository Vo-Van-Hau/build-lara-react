<?php

namespace Sellers\Shop\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Shop\Interfaces\ShopRepositoryInterface;
use Sellers\Shop\Models\Stores;
use Illuminate\Support\Facades\Config;

class ShopRepository extends BaseRepository implements ShopRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected Stores $stores_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(
        Stores $model,
        Stores $stores_model
    ) {
        $this->model = $model;
        $this->stores_model = $stores_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []) {

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function create_store($input = []) {
        try {
            $this->stores_model->name = $input['name'];
            $this->stores_model->seller_id = $input['seller_id'];
            $this->stores_model->brand_logo = $input['brand_logo'];
            $this->stores_model->joined_date = $input['joined_date'] ?? date('Y-m-d H:i:s');
            $this->stores_model->status = 1;
            $this->stores_model->description = $input['description'];
            $this->stores_model->user_created_id = $input['user_id'];
            $this->stores_model->user_updated_id = $input['user_id'];
            $this->stores_model->user_owner_id = $input['user_id'];
            $this->stores_model->created_at = $input['created_at'] ?? date('Y-m-d H:i:s');
            $this->stores_model->updated_at = $input['updated_at'] ?? date('Y-m-d H:i:s');
            if($this->stores_model->save()) {
                return $this->stores_model;
            }
            return false;
        }
        catch (Exception $errors) {
            return $errors->getMessage();
        }
    }
}
