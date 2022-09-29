<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Products\Models\Products;

class OrderDetail extends ModelBase {

    protected $connection = "mysql";
    protected $table = "order_detail";

    protected $fillable = [
        "order_id",
        "product_id",
        "product_name",
        "product_image_link",
        "quantity",
        "price",
        "note",
        "description",
    ];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
     * @author <hauvo1709@gmail.com>
     * @todo
     * @return void
     */
    public function product() {
        return $this->belongsTo(Products::class, "product_id", "id")
        ->where([
            "products.status" => 1,
            "products.deleted" => 0
        ]);
    }
}
