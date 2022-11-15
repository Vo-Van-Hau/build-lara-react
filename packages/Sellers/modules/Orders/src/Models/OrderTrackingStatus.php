<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\OrderDetail;

class OrderTrackingStatus extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_tracking_status';

    protected $fillable = [
        'name',
        'status',
        'description',
    ];

    /**=======================
     *     RelationShip
     *=======================*/
}
