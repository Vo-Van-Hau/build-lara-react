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

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo: Relationship
    * @param int $order_tracking_status_id
    * @return mixed
    */
    public function get_next_order_tracking_status(int $order_tracking_status_id) {
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
}
