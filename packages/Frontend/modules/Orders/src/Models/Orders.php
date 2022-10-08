<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Orders\Models\OrderDetail;
use Frontend\Customer\Models\Customer;

class Orders extends ModelBase {

    protected $connection = "mysql";
    protected $table = "orders";

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
     public function order_detail() {
        return $this->hasMany(OrderDetail::class, "order_id", "id")
        ->where([
            "order_detail.deleted" => 0
        ])->with(["product"]);
     }

    /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
    public function customer() {
        return $this->belongsTo(Customer::class, "user_id", "id")
        ->where([
            "customers.status" => 1,
            "customers.deleted" => 0
        ]);
    }
}
