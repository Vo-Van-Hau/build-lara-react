<?php

namespace Modules\Publishers\Models;

use Modules\Core\Models\ModelBase;

class Publishers extends ModelBase {

    protected $connection = "mysql";
    protected $table = "publishers";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
}
