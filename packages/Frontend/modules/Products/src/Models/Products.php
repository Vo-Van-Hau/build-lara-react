<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Sellers\Models\Sellers;
use Frontend\Products\Models\ProductStock;
use Frontend\Products\Models\ProductIdentifiers;
use Frontend\Products\Models\ProductDescriptionDetail;
use Frontend\Products\Models\ProductCaterory;
use Frontend\Products\Models\ProductsAdditionalImageLink;

class Products extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'products';

    protected $fillable = [
        'name',
        'slug_name',
        'price',
        'sale_price_id',
        'cogs',
        'link',
        'mobile_link',
        'image_link',
        'additional_image_link',
        'category_id',
        'currency_id',
        'availability',
        'availability_date',
        'expiration_date',
        'status',
        'description',
        'user_created_id',
        'user_updated_id',
        'user_owner_id',
        'created_at',
        'updated_at',
        'deleted',
        'deleted_at',
    ];

    /**=======================
     *     RelationShip
     *=======================*/

     /**
      * @author <hauvo1709@gmail.com>
      * @todo
      * @param
      * @return void
      */
    public function seller() {
        return $this->belongsTo(Sellers::class, 'seller_id', 'id')
            ->with([
                'store' => function ($query) {
                    $query->select('id', 'name', 'seller_id', 'brand_logo', 'status');
                }
            ])
            ->where([
                'sellers.status' => 1,
                'sellers.deleted' => 0
            ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function product_stock() {
        return $this->hasOne(ProductStock::class, 'product_id', 'id')->where([
            'product_stock.status' => 1
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function product_identifiers() {
        return $this->hasOne(ProductIdentifiers::class, 'product_id', 'id')->where([
            'product_identifiers.status' => 1,
            'product_identifiers.deleted' => 0,
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function product_description_detail() {
        return $this->hasOne(ProductDescriptionDetail::class, 'product_id', 'id')->where([
            'product_description_detail.status' => 1,
            'product_description_detail.deleted' => 0,
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function category() {
        return $this->belongsTo(ProductCaterory::class, 'category_id', 'id')->where([
            'product_categories.status' => 1,
            'product_categories.deleted' => 0,
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function products_additional_image_link() {
        return $this->hasMany(ProductsAdditionalImageLink::class, 'product_id', 'id')->where([
            'products_additional_image_link.status' => 1,
            'products_additional_image_link.deleted' => 0,
        ]);
    }
}
