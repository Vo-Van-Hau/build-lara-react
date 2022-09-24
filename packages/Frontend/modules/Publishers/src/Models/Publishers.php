<?php

namespace Frontend\Publishers\Models;

use Frontend\Core\Models\ModelBase;

class Publishers extends ModelBase {

    protected $connection = "mysql";
    protected $table = "publishers";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
