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
use Frontend\Products\Models\ProductsAdditionalImageLink;
use Frontend\Sellers\Models\Sellers;
use Frontend\Orders\Models\OrderDetail;
use Frontend\Shop\Models\Stores;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected ProductCaterory $product_category_model;
    protected ProductsAdditionalImageLink $products_additional_image_link_model;
    protected Sellers $sellers_model;
    protected OrderDetail $order_detail_model;
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
        Products $model,
        ProductCaterory $product_category_model,
        Sellers $sellers_model,
        ProductsAdditionalImageLink $products_additional_image_link_model,
        OrderDetail $order_detail_model,
        Stores $stores_model
    ) {
        $this->model = $model;
        $this->product_category_model = $product_category_model;
        $this->sellers_model = $sellers_model;
        $this->products_additional_image_link_model = $products_additional_image_link_model;
        $this->order_detail_model = $order_detail_model;
        $this->stores_model = $stores_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = '', $status = [], $page = 1) {
        $result = $this->model
        ->where([
            'status' => 1,
            'deleted' => 0,
        ])
        ->with([
            'seller' => function($query) {
                $query->select('id', 'is_accepted');
            },
            'product_description_detail' => function($query) {
                $query->select('id', 'condition', 'color');
            },
            'category' => function($query) {
                $query->with([
                    'product_category_brands' => function($query) {
                        $query->select('id', 'name', 'category_id', 'status');
                    }
                ])->select('id', 'title');
            }
        ])
        ->select(
            'id', 'seller_id', 'name', 'slug_name', 'price', 'sale_price_id', 'link', 'mobile_link', 'image_link', 'category_id', 'availability',
            'availability_date', 'expiration_date', 'status'
        );
        if(!empty($status)) {
            $result = $result->whereIn('status', $status);
        }
        $result = $result->paginate($page*Config::get('item_per_home', 60));
        if(!empty($result)) {
            foreach($result as $key => $item) {
                $result[$key]->price_format = number_format($item->price, 0, '.', ',');
            }
            return $result;
        } else {
            return [];
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_per_page($keyword = '', $status = [], $start = 0) {
        $result = $this->model->where(['deleted' => 0]);
        if(!empty($status)) {
            $result = $result->whereIn('status', $status);
        }
        $result = $result->offset(intval($start)*Config::get('item_per_home', 60))
        ->orderByRaw('products.id DESC')
        ->limit(Config::get('item_per_home', 60))->get()
        ->makeHidden([
            'user_created_id', 'user_updated_id', 'user_owner_id', 'created_at', 'updated_at',
            'deleted', 'deleted_at'
        ]);
        if(!empty($result)) {
            foreach($result as $key => $item) {
                $result[$key]->price_format = number_format($item->price, 0, '.', ',');
            }
            return $result;
        } else {
            return [];
        }
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
                $query->select('id', 'user_id', 'fullname', 'phone', 'status');
            },
            'category' => function($query) {
                $query->select('id', 'parent_id', 'title', 'uncle_id', 'friend_id', 'icon_link', 'status');
            },
            'products_additional_image_link' => function($query) {
                $query->select('product_id', 'id', 'url');
            },
            'product_identifiers' => function($query) {
                $query->select('id', 'brand', 'product_id', 'sku', 'status');
            }
        ])
        ->first()->makeHidden([
            'user_created_id', 'user_updated_id', 'user_owner_id', 'created_at', 'updated_at',
            'deleted', 'deleted_at'
        ]);
        if(!empty($result)) {
            $result->price_format = number_format($result->price, 0, '.', ',');
            $quantity_sold = $this->order_detail_model->get_by_product_id($id) ?? [];
            $result->quantity_sold = !empty($quantity_sold) ? count($quantity_sold) : 0;
            $result->similar_products = $this->model->where('id', '<>', $id)
                ->whereRaw("products.category_id = {$result->category->id}")
                ->orderByRaw('products.id DESC')
                ->limit(Config::get('packages.frontend.products.limit_similar_products', 36))->get();
        }
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

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return mixed
     */
    public function search_products($data) {
        $q = isset($data['q']) ? $data['q'] : '';
        if(empty($q)) return false;
        $condition = 'products.name LIKE "%' . $q . '%"';
        $result = $this->model->whereRaw($condition)
        ->where([
            'status' => 1,
            'deleted' => 0
        ])
        ->paginate(50);
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return mixed
     */
    public function filter_products($data) {
        $min_price = $data['min_price'] ?? 0;
        $max_price = $data['max_price'] ?? 0;
        $locations = $data['locations'] ?? [];
        $brands = $data['brands'] ?? [];
        $stores = $data['stores'] ?? [];
        $result = $this->model
        ->with([
            'seller' => function($query) {
                $query->select('id', 'is_accepted');
            },
            'product_description_detail' => function($query) {
                $query->select('id', 'condition', 'color');
            },
            'category' => function($query) {
                $query->with([
                    'product_category_brands' => function($query) {
                        $query->select('id', 'name', 'category_id', 'status');
                    }
                ])->select('id', 'title');
            }
        ])
        ->where([
            'status' => 1,
            'deleted' => 0
        ]);
        /**
         * Filter: locations
         */
        if(!empty($locations)) {
            $seller_ids = $this->stores_model->whereIn('province_id', $locations)->select('seller_id');
            if(!empty($seller_ids)) {
                $result->whereIn('seller_id', $seller_ids);
            }
        }
        /**
         * Filter: brands
         */
        if(!empty($brands)) {
            $category_ids = $this->product_category_model->get_category_ids_by_brands($brands);
            if(!empty($category_ids)) {
                $result->whereIn('category_id', $category_ids);
            }
        }
        /**
         * Filter: stores
         */
        if(!empty($stores)) {
            $seller_ids = $this->sellers_model->get_seller_ids_by_stores($stores);
            if(!empty($seller_ids)) {
                $result->whereIn('seller_id', $seller_ids);
            }
        }
        /**
         * Filter: prices
         */
        if(!empty($min_price) && !empty($max_price)) {
            $result->whereBetween('price', [$min_price, $max_price]);
        }
        $result = $result->select(
            'id', 'seller_id', 'name', 'slug_name', 'price', 'sale_price_id', 'link', 'mobile_link', 'image_link', 'category_id', 'availability',
            'availability_date', 'expiration_date', 'status'
        )->get();
        if(!empty($result)) {
            foreach($result as $key => $item) {
                $result[$key]->price_format = number_format($item->price, 0, '.', ',');
            }
            return $result;
        } else {
            return [];
        }
    }

}
