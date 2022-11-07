<?php

namespace Frontend\Products\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Products\Interfaces\ProductsRepositoryInterface;
use Frontend\Products\Models\Products;
use Frontend\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;
use Frontend\Products\Products as ProductsProducts;
use Frontend\Products\Models\ProductCaterory;
use Sellers\Sellers\Models\Sellers;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected ProductCaterory $product_category_model;
    protected Sellers $sellers_model;

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
        Products $model,
        ProductCaterory $product_category_model,
        Sellers $sellers_model
    ) {
        $this->model = $model;
        $this->product_category_model = $product_category_model;
        $this->sellers_model = $sellers_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = '', $status = []) {
        $result = $this->model->where(['deleted' => 0]);
        if(!empty($status)) {
            $result = $result->whereIn('status', $status);
        }
        return $result->paginate(Config::get('packages.frontend.products.item_per_page', 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id) {
        $result = $this->model->where('id', $id)
        ->with([
            'seller' => function($query) {

            },
            'category' => function($query) {

            }
        ])
        ->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function get_categories() {
        $result = $this->product_category_model->where([
            'parent_id' => 0,
            'deleted' => 0,
            'status' => 1
        ])->select('title as label', 'id as key', 'id as value', 'icon_link')->get();
        foreach($result as $key => $item) {
            $id = $item->value;
            $item->children = $this->product_category_model->where([
                'parent_id' => $id,
                'deleted' => 0,
                'status' => 1
            ])->select('title as label', 'id as key', 'id as value', 'icon_link')->get();
        }
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return mixed
     */
    public function get_category_by_id($data) {
        $id = isset($data['id']) ? $data['id'] : 0;
        $result = $this->product_category_model->where([
            'deleted' => 0,
            'status' => 1
        ])->select('title', 'title as label', 'id as value', 'icon_link')->find($id);
        // foreach($result as $key => $item) {
        //     $id = $item->value;
        //     $item->children = $this->product_category_model->where([
        //         'parent_id' => $id,
        //         'deleted' => 0,
        //         'status' => 1
        //     ])->select('title as label', 'id as value')->get();
        // }
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function get_products_sellers($input) {
        $seller_id = $input['seller_id'];
        $seller = $this->sellers_model->where([
            'status' => 1,
            'deleted' => 0,
            'id' => $seller_id
        ])->first();
        if(empty($seller_id) || empty($seller)) return false;
        $existed = $this->model->where([
            // 'status' => 1,
            'deleted' => 0,
            'seller_id' => $seller->id
        ])->with([
            'product_stock'
        ])->paginate(10);
        if(empty($existed)) return false;
        return $existed;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return mixed
     */
    public function get_products_by_category($data) {
        $category_id = isset($data['category_id']) ? $data['category_id'] : 0;
        $result = $this->model->where([
            'status' => 1,
            'deleted' => 0,
            'category_id' => $category_id
        ])->get();
        return $result;
    }
}
