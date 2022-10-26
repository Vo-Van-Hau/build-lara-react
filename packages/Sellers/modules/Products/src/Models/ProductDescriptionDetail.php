<?php

namespace Sellers\Products\Models;

use Sellers\Core\Models\ModelBase;

class ProductDescriptionDetail extends ModelBase {

    protected $connection = "mysql";
    protected $table = "product_description_detail";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
