<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Products\Models\ProductStock;
use Sellers\Products\Models\ProductIdentifiers;
use Sellers\Products\Models\ProductDescriptionDetail;

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
    public function product_stock() {
        return $this->hasOne(ProductStock::class, "product_id", "id")->where([
            "product_stock.status" => 1
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function product_identifiers() {
        return $this->hasOne(ProductIdentifiers::class, "product_id", "id")->where([
            "product_identifiers.status" => 1
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function product_description_detail() {
        return $this->hasOne(ProductDescriptionDetail::class, "product_id", "id")->where([
            "product_description_detail.status" => 1
        ]);
    }
}
