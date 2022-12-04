<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;

class OrderTrackingGroupStatus extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_tracking_group_status';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];

    /**=======================
     *     RelationShip
     *=======================*/
}
