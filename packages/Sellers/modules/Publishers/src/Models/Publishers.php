<?php

namespace Sellers\Publishers\Models;

use Sellers\Core\Models\ModelBase;

class Publishers extends ModelBase {

    protected $connection = "mysql";
    protected $table = "publishers";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
