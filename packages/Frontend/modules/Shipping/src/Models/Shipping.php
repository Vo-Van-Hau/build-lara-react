<?php

namespace Frontend\Shipping\Models;

use Frontend\Core\Models\ModelBase;

class Shipping extends ModelBase {

    protected $connection = "mysql";
    protected $table = "shipping";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
