<?php

namespace Sellers\Sellers\Models;

use Sellers\Core\Models\ModelBase;

class Sellers extends ModelBase {

    protected $connection = "mysql";
    protected $table = "sellers";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
