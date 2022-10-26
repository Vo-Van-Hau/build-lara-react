<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;

class ProductCaterory extends ModelBase {

    protected $connection = "mysql";
    protected $table = "product_categories";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
