<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;

class ProductStock extends ModelBase {

    protected $connection = "mysql";
    protected $table = "product_stock";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
