<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\Orders as ModelsOrders;

class Users extends ModelBase
{

    protected $connection = "mysql";
    protected $table = "users";

    protected $fillable = [
        "name",
        "status",
        "description",
    ];
    public function users()
    {
        return $this->hasMany(Orders::class, 'id', 'user_id');
    }
}