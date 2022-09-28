<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;

class CustomerAddress extends ModelBase {

    protected $connection = "mysql";
    protected $table = "customer_address";

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/
}
