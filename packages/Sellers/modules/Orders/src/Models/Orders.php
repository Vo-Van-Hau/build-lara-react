<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;

class Orders extends ModelBase
{

    protected $connection = "mysql";
    protected $table = "orders";

    protected $fillable = [
        "name",
        "status",
        "description",
    ];
    public function order_detail()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
}