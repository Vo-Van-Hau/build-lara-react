<?php

namespace Frontend\Sellers\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Sellers\Interfaces\SellersRepositoryInterface;
use Frontend\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;
use Frontend\Sellers\Models\Sellers;

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
    public function __construct(
        Sellers $model
    ) {
        $this->model = $model;
        $this->originalModel = $model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = '', $status = []) {
        // $result = $this->model->where(['deleted' => 0]);
        // if(!empty($status)) {
        //     $result = $result->whereIn('status', $status);
        // }
        // return $result->paginate(Config::get('packages.frontend.products.item_per_page', 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return Illuminate\Support\Collection
     */
    public function get_shop($data) {
        $seller_id = $data['seller_id'] ?? 0;
        $seller = $this->model
        ->where([
            'id' => $seller_id,
            'status' => 1,
            'deleted' => 0
        ])
        ->with([
            'store' => function($query) use ($seller_id) {

            }
        ])->first();
        if(empty($seller)) return false;
        if(isset($seller->store)) {
            $seller['store']['joined_date'] = date_format(date_create($seller->store->joined_date), 'd/m/Y');
            return $seller;
        }
        return false;
    }
}
