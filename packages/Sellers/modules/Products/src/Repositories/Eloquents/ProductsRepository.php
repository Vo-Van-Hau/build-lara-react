<?php

namespace Sellers\Products\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Products\Interfaces\ProductsRepositoryInterface;
use Sellers\Products\Models\Products;
use Sellers\Products\Models\ProductIdentifiers;
use Sellers\Products\Models\ProductDescriptionDetail;
use Sellers\Products\Models\ProductStock;
use Sellers\Products\Models\ProductCaterory;
use Sellers\Sellers\Models\Sellers;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $sellers_model;
    protected $product_identifiers_model;
    protected $product_description_detail_model;
    protected $product_stock_model;
    protected $product_category_model;

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
        Sellers $sellers_model,
        ProductIdentifiers $product_identifiers_model,
        ProductDescriptionDetail $product_description_detail_model,
        ProductStock $product_stock_model,
        ProductCaterory $product_category_model
    ) {
        $this->model = $model;
        $this->sellers_model = $sellers_model;
        $this->product_identifiers_model = $product_identifiers_model;
        $this->product_description_detail_model = $product_description_detail_model;
        $this->product_stock_model = $product_stock_model;
        $this->product_category_model = $product_category_model;
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
            // "status" => 1,
            "deleted" => 0,
            "seller_id" => $seller->id
        ])->with([
            "stock"
        ])->paginate(10);
        if(empty($existed)) return false;
        return $existed;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function get_categories() {
        $result = $this->product_category_model->where([
            "parent_id" => 0,
            "deleted" => 0,
            "status" => 1
        ])->select("title as label", "id as value")->get();
        foreach($result as $key => $item) {
            $id = $item->value;
            $item->children = $this->product_category_model->where([
                "parent_id" => $id,
                "deleted" => 0,
                "status" => 1
            ])->select("title as label", "id as value")->get();
        }
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function store($input) {
        $user_id = $input["user_id"];
        $seller = $this->sellers_model->where([
            "status" => 1,
            "deleted" => 0,
            "user_id" => $user_id
        ])->first();
        if(is_null($user_id) || is_null($seller)) return false;
        $name = isset($input["name"]) ? $input["name"] : "";
        $seller_id = isset($seller->id) ? $seller->id : 0;
        $slug_name = Str::slug($name);
        $price = isset($input["price"]) ? $input["price"] : 0;
        $sale_price_id = 0;
        $cogs = $price;
        $mobile_link = "";
        $image_link = "";
        $category_id = isset($input["category_id"]) ? $input["category_id"] : 0;
        $currency_id = 1;
        $availability = "in_stock";
        $availability_date = date("Y-m-d H:i:s");
        $expiration_date = date("Y-m-d H:i:s");
        $status = 0;
        $description = isset($input["description"]) ? $input["description"] : "";
        $colors = "";
        foreach($input["color"] ?? [] as $key => $_colors) {
            if($key == count($input["color"] ?? []) - 1) {
                $colors .= $_colors;
            } else {
                $colors .= $_colors . "-";
            }
        }
        $new = $this->model;
        $new->name = $name;
        $new->seller_id = $seller_id;
        $new->slug_name = $slug_name;
        $new->price = $price;
        $new->sale_price_id = $sale_price_id;
        $new->cogs = $cogs;
        $new->mobile_link = $mobile_link;
        $new->image_link = $image_link;
        $new->category_id = $category_id;
        $new->currency_id = $currency_id;
        $new->availability = $availability;
        $new->availability_date = $availability_date;
        $new->expiration_date = $expiration_date;
        $new->status = $status;
        $new->description = $description;
        if($new->save()) {
            $product_id = $new->id;
            // Update Product
            $link = Config::get("app.url", "") . "/shopping/products/productdetail?action=view&id=" . $product_id;
            $mobile_link = str_replace(request()->getHost(), "m.".request()->getHost(), Config::get("app.url", "") . "/shopping/products/productdetail?action=view&id=" . $product_id);
            $new->link = $link;
            $new->mobile_link = $mobile_link;
            $new->save();

            // Product Identifiers
            $this->product_identifiers_model->product_id = $product_id;
            $this->product_identifiers_model->brand = isset($input["brand"]) ? $input["brand"] : "";
            $this->product_identifiers_model->supplier_id = isset($input["supplier_id"]) ? $input["supplier_id"] : 0;
            $this->product_identifiers_model->sku = isset($input["sku"]) ? $input["sku"] : "";
            $this->product_identifiers_model->gtin = isset($input["gtin"]) ? $input["gtin"] : "";
            $this->product_identifiers_model->mpn = isset($input["mpn"]) ? $input["mpn"] : "";
            $this->product_identifiers_model->status = 1;
            $this->product_identifiers_model->save();
            // Product Description Detail
            $this->product_description_detail_model->product_id = $product_id;
            $this->product_description_detail_model->condition = isset($input["condition"]) ? $input["condition"] : "new";
            $this->product_description_detail_model->color = $colors;
            $this->product_description_detail_model->for_adult = isset($input["for_adult"]) ? $input["for_adult"] : 1;
            $this->product_description_detail_model->weight = isset($input["weight"]) ? $input["weight"] : 0;
            $this->product_description_detail_model->width = isset($input["width"]) ? $input["width"] : 0;
            $this->product_description_detail_model->height = isset($input["height"]) ? $input["height"] : 0;
            $this->product_description_detail_model->length = isset($input["length"]) ? $input["length"] : 0;
            $this->product_description_detail_model->gender = isset($input["gender"]) ? $input["gender"] : 0;
            $this->product_description_detail_model->size_type = isset($input["size_type"]) ? $input["size_type"] : "all";
            $this->product_description_detail_model->size = isset($input["size"]) ? $input["size"] : "";
            $this->product_description_detail_model->material = isset($input["material"]) ? $input["material"] : 0;
            $this->product_description_detail_model->save();
            // Product Stock
            $this->product_stock_model->product_id = $product_id;
            $this->product_stock_model->warehouse_id = 0;
            $this->product_stock_model->product_quantity = isset($input["quantity"]) ? $input["quantity"] : 0;
            $this->product_stock_model->status = 1;
            $this->product_stock_model->save();
            return true;
        } else {
            return false;
        }
    }
}
