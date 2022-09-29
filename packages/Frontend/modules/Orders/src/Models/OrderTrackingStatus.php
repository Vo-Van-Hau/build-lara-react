<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;

class OrderTrackingStatus extends ModelBase {

    protected $connection = "mysql";
    protected $table = "order_tracking_status";

    protected $fillable = [
        "name",
        "status",
        "description"
    ];

    /**=======================
     *     RelationShip
     *=======================*/
}
