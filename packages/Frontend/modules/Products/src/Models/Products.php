<?php

namespace Frontend\Products\Models;

use Products\Core\Models\ModelBase;

class Products extends ModelBase {

    protected $connection = "mysql";
    protected $table = "products";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
