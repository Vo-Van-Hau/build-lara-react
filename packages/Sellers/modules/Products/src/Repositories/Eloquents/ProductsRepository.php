<?php

namespace Sellers\Products\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Products\Interfaces\ProductsRepositoryInterface;
use Sellers\Products\Models\Products;
use Sellers\Sellers\Models\Sellers;
use Illuminate\Support\Facades\Config;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $sellers_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Products $model, Sellers $sellers_model) {
        $this->model = $model;
        $this->sellers_model = $sellers_model;
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
     * @param int $id
     * @param array $input
     * @return boolean
     */
    public function update($id, $input = []) {
        $existed = $this->model->find($id);
        if (empty($existed)) return false;
        $existed->name = $input["name"];
        $existed->status = $input["status"];
        $existed->parent_group_id = $input["parent_group_id"];
        $existed->description = $input["description"];
        return $existed->update(); // return boolean
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function get_products_sellers($input) {
        $user_id = $input["user_id"];
        $seller = $this->sellers_model->where([
            "status" => 1,
            "deleted" => 0,
            "user_id" => $user_id
        ])->first();
        if(is_null($user_id) || is_null($seller)) return false;
        $existed = $this->model->where([
            "status" => 1,
            "deleted" => 0,
            "seller_id" => $seller->id
        ])->paginate(10);
        if(empty($existed)) return false;
        return $existed;
    }
}
