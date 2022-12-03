<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Orders\Models\OrderDetail;
use Frontend\Orders\Models\OrderTrackingStatus;
use Frontend\Customer\Models\Customer;

class Orders extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'orders';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
     public function order_detail() {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id')
        ->where([
            'order_detail.deleted' => 0
        ])->with([
            'product' => function($query) {
                $query->with([
                    'seller' => function($query) {
                        $query->select('id');
                    }
                ])->select(
                    'id', 'seller_id', 'name', 'slug_name', 'price', 'cogs', 'link', 'mobile_link', 'image_link',
                    'additional_image_link', 'status', 'description'
                );
            }
        ]);
     }

    /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
    public function customer() {
        return $this->belongsTo(Customer::class, 'user_id', 'id')
        ->where([
            'customers.status' => 1,
            'customers.deleted' => 0
        ]);
    }

    /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
    public function order_tracking_status() {
        return $this->belongsTo(OrderTrackingStatus::class, 'order_tracking_status_id', 'id')
        ->where([
            'order_tracking_status.status' => 1,
            'order_tracking_status.deleted' => 0
        ]);
    }
}
