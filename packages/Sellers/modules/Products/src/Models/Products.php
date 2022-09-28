<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;

class Products extends ModelBase {

    protected $connection = "mysql";
    protected $table = "products";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
