<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Orders\Models\OrderTrackingStatus;

class OrderTrackingDetails extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_tracking_details';

    protected $fillable = [
        'name',
        'status',
        'description',
    ];

    /**=======================
     *     RelationShip
     *=======================*/
     /**
      * @author: <hauvo1709@gmail.com>
      * @todo: Relationship
      * @param
      * @return void
      */
    public function order_tracking_status() {
        return $this->belongsTo(OrderTrackingStatus::class, 'order_tracking_status_id', 'id')
        ->where([
            'order_tracking_status.status' => 1,
            'order_tracking_status.deleted' => 0,
        ]);
    }
}
