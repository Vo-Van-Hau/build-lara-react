<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Products\Models\ProductStock;

class Products extends ModelBase {

    protected $connection = "mysql";
    protected $table = "products";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];

    /**=======================
     *     RelationShip
     *=======================*/
    /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
    public function stock() {
        return $this->hasOne(ProductStock::class, "product_id", "id")->where([
            "product_stock.status" => 1
        ]);
    }
}
