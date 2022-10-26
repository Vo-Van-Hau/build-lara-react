<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;

class ProductIdentifiers extends ModelBase {

    protected $connection = "mysql";
    protected $table = "product_identifiers";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
