<?php

namespace Frontend\Customer\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Address\Models\CustomerAddress;
use Frontend\Users\Models\Users;

class Customer extends ModelBase {

    protected $connection = "mysql";
    protected $table = "customers";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];

    /**=======================
     *     RelationShip
     *=======================*/

     /**
      *
      */
    public function customer_address() {
        return $this->hasMany(CustomerAddress::class, "customer_id", "id")
            ->where([
                "customer_address.status" => 1,
                "customer_address.deleted" => 0,
            ]);
    }

    /**
     *
     */
    public function user() {
        return $this->belongsTo(Users::class, "user_id", "id")
        ->where([
            "users.status" => 1,
            "users.deleted" => 0
        ]);
    }
}
