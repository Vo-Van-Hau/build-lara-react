<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\OrderDetail;
use Sellers\Orders\Models\OrderTrackingGroupStatus;

class OrderTrackingStatus extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_tracking_status';
    const LAST_STATUS_ID = 10;

    protected $fillable = [
        'name',
        'status',
        'description',
    ];

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo: Relationship
    * @param int $order_tracking_status_id
    * @return mixed
    */
    public function get_next_order_tracking_status(int $order_tracking_status_id) {
        if(intval($order_tracking_status_id) === self::LAST_STATUS_ID)
        return $this->select('id', 'title', 'code', 'tag_name', 'status')
        ->find(self::LAST_STATUS_ID);
        $next_step = [];
        switch($order_tracking_status_id) {
            case 1:
                break;
        }
        $next_step = $this->select('id', 'title', 'code', 'tag_name', 'status')
        ->where([
            'status' => 1,
            'deleted' => 0,
        ])
        ->find(intval($order_tracking_status_id) + 1);
        if(!empty($next_step)) return $next_step;
        return 0;
    }

    /**=======================
     *     RelationShip
     *=======================*/

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function order_tracking_group_status() {
        return $this->belongsTo(OrderTrackingGroupStatus::class, 'group_status_id', 'id')
        ->where([
            'order_tracking_group_status.status' => 1,
            'order_tracking_group_status.deleted' => 0
        ]);
    }
}
