<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Sellers\Models\Sellers;

class Products extends ModelBase {

    protected $connection = "mysql";
    protected $table = "products";

    protected $fillable = [
        "name",
        "slug_name",
        "price",
        "sale_price_id",
        "cogs",
        "link",
        "mobile_link",
        "image_link",
        "additional_image_link",
        "category_id",
        "currency_id",
        "availability",
        "availability_date",
        "expiration_date",
        "status",
        "description",
        "user_created_id",
        "user_updated_id",
        "user_owner_id",
        "created_at",
        "updated_at",
        "deleted",
        "deleted_at",
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
                "store"
            ])
            ->where([
                "sellers.status" => 1,
                "sellers.deleted" => 0
            ]);
    }

    
}
