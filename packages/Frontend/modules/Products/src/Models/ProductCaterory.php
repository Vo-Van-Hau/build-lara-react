<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Products\Models\ProductCategoryBrands;

class ProductCaterory extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'product_categories';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param array $brand_ids
     * @return
     */
    public function get_category_ids_by_brands($brand_ids = []) : array {
        if(empty($brand_ids)) return [];
        $result = ProductCategoryBrands::whereIn('id', $brand_ids)->select('category_id')->get()->toArray();
        if(!empty($result)) {
            foreach($result as $key => $_result) {
                unset($result[$key]);
                $result[$key] = $_result['category_id'];
            }
            $result = array_unique($result);
        }
        return $result;
    }

    /**=======================
     *     RelationShip
     *=======================*/

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function product_category_brands() {
        return $this->hasMany(ProductCategoryBrands::class, 'category_id', 'id')->where([
            'product_category_brands.status' => 1,
            'product_category_brands.deleted' => 0,
        ]);
    }
}
