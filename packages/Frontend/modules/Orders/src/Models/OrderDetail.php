<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Products\Models\Products;
use Frontend\Orders\Models\OrderTrackingDetails;

class OrderDetail extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_detail';

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_image_link',
        'quantity',
        'price',
        'note',
        'description',
    ];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
     * @author <hauvo1709@gmail.com>
     * @todo
     * @return void
     */
    public function product() {
        return $this->belongsTo(Products::class, 'product_id', 'id')
        ->where([
            'products.status' => 1,
            'products.deleted' => 0
        ]);
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo
     * @return void
     */
    public function order_tracking_details() {
        return $this->hasMany(OrderTrackingDetails::class, 'order_detail_id', 'id')
        ->where([
            'order_tracking_details.status' => 1,
            'order_tracking_details.deleted' => 0
        ]);
    }
}
