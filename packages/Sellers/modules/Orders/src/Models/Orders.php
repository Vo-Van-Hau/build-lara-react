<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\OrderDetail;

class Orders extends ModelBase {

    protected $connection = "mysql";
    protected $table = "orders";

    protected $fillable = [
        "name",
        "status",
        "description",
    ];

    /**=======================
     *     RelationShip
     *=======================*/

     /**
      * @author
      * @todo:
      * @param
      * @return
      */
    public function order_detail() {
        return $this->hasMany(OrderDetail::class, "order_id", "id")
        ->where([
            "order_detail.deleted" => 0
        ]);
    }
}
