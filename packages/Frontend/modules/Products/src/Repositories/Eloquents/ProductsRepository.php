<?php

namespace Frontend\Products\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Products\Interfaces\ProductsRepositoryInterface;
use Frontend\Products\Models\Products;
use Frontend\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;
use Frontend\Products\Products as ProductsProducts;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface {

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
    public function __construct(Products $model)
    {
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
        if(!empty($status)) {
            $result = $result->whereIn("status", $status);
        }
        return $result->paginate(Config::get("packages.frontend.products.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id) {
        $result = $this->model->where("id", $id)
        ->with(["seller"])
        ->first();
        return $result;
    }

    public function upsert($input)
    {
        $id = !empty($input['id']) ? $input['id'] : 0;

        if ($id) {
            $products = Products::find($id);

            if (empty($products)) {
                return $products->response_base(["status" => false], "Access denied !", 200);
            }
            $products->name = array_get($input, 'name', $products->name);

            $products->slug_name = array_get($input, 'slug_name', $products->slug_name);

            $products->price = array_get($input, 'price', $products->price);

            $products->slpr_id = array_get($input, 'slpr_id', $products->slpr_id);

            $products->cogs = array_get($input, 'cogs', $products->cogs);

            $products->link = array_get($input, 'link', $products->link);

            $products->mobile_link = array_get($input, 'mobile_link', $products->mobile_link);

            $products->image_link = array_get($input, 'image_link', $products->image_link);

            $products->cate_id = array_get($input, 'cate_id', $products->cate_id);

            $products->unit_pricing_measure_id = array_get($input, 'unit_pricing_measure_id', $products->unit_pricing_measure_id);

            $products->availability = array_get($input, 'availability', $products->availability);

            $products->availability_date = array_get($input, 'availability_date', $products->availability_date);

            $products->expiration_date = array_get($input, 'expiration_date', $products->expiration_date);

            $products->status = array_get($input, 'status', $products->status);

            $products->description = array_get($input, 'description', $products->description);

            $products->updated_at = date("Y-m-d H:i:s", time());
            $products->save();
        } else {
            $param = [
                'name'                             => $input['name'],
                'slug_name'                        => $input['slug_name'] ?? null,
                'price'                            => $input['price'],
                'slpr_id'                          => $input['slpr_id'],
                'cogs'                             => $input['cogs'],
                'link'                             => $input['link'],
                'mobile_link'                      => $input['mobile_link'],
                'image_link'                       => $input['image_link'],
                'additional_image_link'            => $input['additional_image_link'],
                'cate_id'                          => $input['cate_id'],
                'unit_pricing_measure_id'          => $input['unit_pricing_measure_id'],
                'availability'                     => $input['availability'],
                'availability_date'                => $input['availability_date'],
                'expiration_date'                  => $input['expiration_date'],
                'status'                           => $input['status'],
                'description'                      => $input['description'],

            ];

            $products = $this->create($param);
        }

        return $products;
    }
}
