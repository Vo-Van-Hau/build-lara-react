<?php

namespace Frontend\Customer\Models;

use Frontend\Core\Models\ModelBase;

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
}
