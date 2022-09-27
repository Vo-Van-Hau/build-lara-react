<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;

class Products extends ModelBase {

    protected $connection = "mysql";
    protected $table = "products";

    protected $fillable = [

    ];
}
