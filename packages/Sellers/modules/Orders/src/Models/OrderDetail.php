<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;

class OrderDetail extends ModelBase
{

    protected $connection = "mysql";
    protected $table = "order_detail";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];
    public function order_detail()
    {
        return $this->hasMany(Orders::class, 'id', 'order_id');
    }
}