<?php

namespace Frontend\Sellers\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Shop\Models\Stores;

class Sellers extends ModelBase {

    protected $connection = "mysql";
    protected $table = "sellers";

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
    * @author <hauvo1709@gmail.com>
    * @todo: get information about store of seller
    * @param
    * @return void
    */
    public function store() {
        return $this->hasOne(Stores::class, "seller_id", "id")
            ->where([
                "stores.status" => 1,
                "stores.deleted" => 0
            ]);
    }
}
