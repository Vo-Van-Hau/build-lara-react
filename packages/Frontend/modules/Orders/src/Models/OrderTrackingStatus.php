<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Orders\Models\OrderTrackingGroupStatus;

class OrderTrackingStatus extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_tracking_status';
    const LAST_STATUS_ID = 10;
    /**
     * @link: https://www.shiprocket.in/shipment-tracking/
     * @link: https://www.shiprocket.in/blog/understanding-the-basic-shipping-terms/
     * @link: https://www.shiprocket.in/blog/courier-parcel-package-tracking-system-working/
     */
    protected $order_tracking_status = [
        1 => [
            'label' => 'Pending',
            'key' => 'pending',
            'code' => 'A0001',
            'description' => '',
        ],
        2 => [
            'label' => 'Awaiting Payment',
            'key' => 'awaiting_payment',
            'code' => 'A0002',
            'description' => '',
        ],
        3 => [
            'label' => 'Awaiting Fulfillment',
            'key' => 'awaiting_fulfillment',
            'code' => 'A0003',
            'description' => '',
        ],
        4 => [
            'label' => 'Awaiting Shipment',
            'key' => 'awaiting_shipment',
            'code' => 'A0004',
            'description' => '',
        ],
        5 => [
            'label' => 'Awaiting Pickup',
            'key' => 'awaiting_pickup',
            'code' => 'A0005',
            'description' => '',
        ],
        6 => [
            'label' => 'Partially Shipped',
            'key' => 'partially_shipped',
            'code' => 'A0006',
            'description' => '',
        ],
        7 => [
            'label' => 'Completed',
            'key' => 'completed',
            'code' => 'A0007',
            'description' => '',
        ],
        8 => [
            'label' => 'Shipped',
            'key' => 'shipped',
            'code' => 'A0008',
            'description' => '',
        ],
        9 => [
            'label' => 'Cancelled',
            'key' => 'cancelled',
            'code' => 'A0009',
            'description' => '',
        ],
        10 => [
            'label' => 'Declined',
            'key' => 'declined',
            'code' => 'A00010',
            'description' => '',
        ],
        11 => [
            'label' => 'refunded',
            'key' => 'refunded',
            'code' => 'A00011',
            'description' => '',
        ],
        12 => [
            'label' => 'disputed',
            'key' => 'disputed',
            'code' => 'A00012',
            'description' => '',
        ],
        13 => [
            'label' => 'Manual Verification Required',
            'key' => 'manual_verification_required',
            'code' => 'A00013',
            'description' => '',
        ],
        14 => [
            'label' => 'Partially Refunded',
            'key' => 'partially_refunded',
            'code' => 'A00014',
            'description' => '',
        ],
        15 => [
            'label' => 'Order Received',
            'key' => 'order_received',
            'code' => 'A00015',
            'description' => 'Your order has been received by your courier partner',
        ],
        16 => [
            'label' => 'Order Picked',
            'key' => 'order_picked',
            'code' => 'A00016',
            'description' => 'Your order has been picked up by your courier partner',
        ],
        17 => [
            'label' => 'Order In Transit',
            'key' => 'order_in_transit',
            'code' => 'A00017',
            'description' => 'Your order is on it’s way to your customer’s address',
        ],
        18 => [
            'label' => 'Out For Delivery',
            'key' => 'out_for_delivery',
            'code' => 'A00018',
            'description' => 'The courier executive is on its way to deliver the order at your customer’s doorstep',
        ],
        19 => [
            'label' => 'Reached Destination',
            'key' => 'reached_destination',
            'code' => 'A00019',
            'description' => 'Your order has reached your customer’s city',
        ],
        20 => [
            'label' => 'Delivered',
            'key' => 'delivered',
            'code' => 'A00020',
            'description' => 'Your order has delivered',
        ],
    ];

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return array
     */
     public function get_order_tracking_status(): array {
        return $this->order_tracking_status;
     }

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
