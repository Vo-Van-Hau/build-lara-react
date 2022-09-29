<?php

namespace Frontend\Payments\Models;

use Frontend\Core\Models\ModelBase;

class Payments extends ModelBase {

    protected $connection = "mysql";
    protected $table = "payments";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];

    /**=======================
     *     RelationShip
     *=======================*/
}
