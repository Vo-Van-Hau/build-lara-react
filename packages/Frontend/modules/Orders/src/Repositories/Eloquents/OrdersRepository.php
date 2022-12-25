<?php

namespace Frontend\Orders\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Orders\Interfaces\OrdersRepositoryInterface;
use Frontend\Orders\Models\Orders;
use Frontend\Orders\Models\OrderDetail;
use Frontend\Orders\Models\OrderTrackingDetails;
use Frontend\Checkout\Models\Carts;
use Frontend\Checkout\Models\CartDetail;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;
use Frontend\Products\Models\ProductStock;

class OrdersRepository extends BaseRepository implements OrdersRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected OrderDetail $order_detail_model;
    protected OrderTrackingDetails $order_tracking_details_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(
        Orders $model,
        OrderDetail $order_detail_model,
        OrderTrackingDetails $order_tracking_details_model
    ) {
        $this->model = $model;
        $this->originalModel = $model;
        $this->order_detail_model = $order_detail_model;
        $this->order_tracking_details_model = $order_tracking_details_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = '', $status = []){

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id) {
        $result = $this->model->where('id', $id)->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function store($input) {
        $user_id = $input['user_id'];
        $new = $this->model;
        if(empty($user_id)) return false;
        $cart = Carts::where([
            'user_id' => $user_id,
            'deleted' => 0,
            'status' => 1,
            'ordered' => 0
        ])->with([
            'cart_detail',
            'user'
        ])->first();
        if(empty($cart)) return false;
        $cart_detail = isset($cart['cart_detail']) ? $cart['cart_detail'] : [];
        $customer = isset($cart['user']['customer']) ? $cart['user']['customer'] : null;
        $customer_address = isset($customer['customer_address']) ? $customer['customer_address'] : null;
        foreach($customer_address as $key => $address) {
            if($address['is_default'] == 1) {
                $customer_delivery = $address;
                break;
            }
            continue;
        }
        if(!isset($customer_delivery)) return false;
        $subtotal = 0;
        $total_amount = 0;
        $discount = 0;
        foreach($cart_detail as $key => $item) {
            $product = $item['product'];
            $quantity = $item['product_quantity'];
            $total_amount += ($product['price'] * $quantity);
        }
        $subtotal = $total_amount;
        // Delivery information
        $new->code = date('YmdHis') . '-' . substr($customer_delivery->phone, -3);
        $new->receiver_name = $customer_delivery->customer_name;
        $new->receiver_phone = $customer_delivery->phone;
        $new->receiver_country_id = $customer_delivery->country_id;
        $new->receiver_province_id = $customer_delivery->province_id;
        $new->receiver_district_id = $customer_delivery->district_id;
        $new->receiver_ward_id = $customer_delivery->ward_id;
        $new->receiver_address = $customer_delivery->address;
        $new->contact_type_id = 1;
        // Checkout information
        $new->subtotal = $subtotal;
        $new->total_amount = $total_amount;
        $new->item_quantity = count($cart_detail);
        $new->discount = $discount;
        $new->user_id = $user_id;
        // Shipping information
        $new->shipping_id = 0;
        // Payment information
        // $new->payment_method_id = $input['payment_method_id'];
        $new->payment_method_id = 1;
        //
        $new->order_tracking_status_id = 1;
        // $new->shipping_method_id = $input['shipping_method_id']
        $new->shipping_method_id = 1;
        $new->transporter_id = 0;
        $new->delivery_date = date('Y-m-d 22:00:00', strtotime('+7 days'));
        $new->status = 0;
        if($new->save()) {
            $order_id = $new->id;
            foreach($cart_detail as $key => $item) {
                $product = $item['product'];
                $quantity = $item['product_quantity'];
                try {
                    $order_detail = OrderDetail::create([
                        'order_id' => $order_id,
                        'product_id' => $product['id'],
                        'product_name' => $product['name'],
                        'product_image_link' => $product['image_link'],
                        'quantity' => $quantity,
                        'price' => $product['price']
                    ]);
                    $order_tracking_detail = $this->create_order_tracking_detail([
                        'status_target' => 1,
                        'order_id' => $order_id ?? 0,
                        'order_detail_id' => $order_detail->id ?? 0,
                    ]);
                    $updateStock = $this->update_quantity_in_stock([
                        'product_id' => $product['id'],
                        'quantity' => $quantity,
                    ]);
                }
                catch (\Exception $exception) {
                    $new->delete();
                    return false;
                }
            }
            // Change status of cart
            $cart->ordered = 1;
            $cart->save();
            return [
                'status' => true,
                'user_email' => $cart['user'] && $cart['user']['email'] ? $cart['user']['email'] : false
            ];
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return mixed
     */
    public function create_order_tracking_detail($data) {
        try {
            $status_target = isset($data['status_target']) ? $data['status_target'] : 0;
            $order_id = isset($data['order_id']) ? $data['order_id'] : 0;
            $order_detail_id = isset($data['order_detail_id']) ? $data['order_detail_id'] : 0;
            $order_tracking_detail= OrderTrackingDetails::create([
                'code' => rand(0, 10) . time(),
                'order_id' => $order_id,
                'order_detail_id' => $order_detail_id,
                'order_tracking_status_id' => $status_target,
                'tracking_at' => date('Y-m-d H:i:s'),
                'order_type' => 2,
                'status' => 1,
            ]);
            if(!empty($order_tracking_detail)) {
                return $order_tracking_detail;
            } else {
                return false;
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return mixed
     */
    public function update_quantity_in_stock($data) {
        try {
            $product_id = isset($data['product_id']) ? $data['product_id'] : 0;
            $quantity = isset($data['quantity']) ? $data['quantity'] : 0;
            $productStock = ProductStock::where([
                'product_id' => $product_id,
                'deleted' => 0,
                'status' => 1,
            ])->select('id', 'product_id', 'product_quantity', 'warehouse_id', 'status')->first();
            if(!empty($productStock)) {
                $existed_quantity = $productStock->product_quantity ?? 0;
                if(intval($existed_quantity) > intval($quantity)) {
                    (int) $new_quantity = $existed_quantity - $quantity;
                    $productStock->product_quantity = $new_quantity;
                    if($productStock->save()) return true;
                    else return false;
                }
            }
            return false;
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function get_history_by_auth($input) {
        $user_id = $input['user_id'];
        if(empty($user_id)) return false;
        $order = $this->model;
        $result = $order->where([
            'deleted' => 0,
            'user_id' => $user_id
        ])
            ->with([
                'customer',
                'order_detail' => function($query) {
                    $query->select('id', 'order_id', 'order_tracking_status_id', 'product_id', 'product_name', 'product_image_link', 'quantity', 'price', 'note');
                },
                'order_tracking_status' => function($query) {
                    $query->select('id', 'group_status_id', 'title', 'code', 'tag_name')
                    ->with([
                        'order_tracking_group_status' => function($query) {
                            $query->select('id', 'title', 'tag_name', 'status');
                        }
                    ]);
                }
            ])
            ->select('id', 'code', 'receiver_name', 'receiver_phone', 'receiver_country_id', 'receiver_province_id', 'receiver_district_id',
                'receiver_ward_id', 'receiver_address', 'subtotal', 'total_amount', 'item_quantity', 'discount', 'user_id', 'shipping_id', 'payment_method_id',
                'contact_type_id', 'order_tracking_status_id', 'shipping_method_id', 'transporter_id', 'delivery_date', 'order_date', 'status',
            )
            ->orderBy('id', 'desc')
            ->get();
        foreach($result as $item) {
            $item->total_amount_format = number_format($item->total_amount, 0, '.', ',');
            $item->estimated_delivery_date = [
                'date' => date('d/m/Y', strtotime($item->delivery_date)),
                'time' => date('H:m', strtotime($item->delivery_date)),
            ];
            if($item->order_detail) {
                foreach($item->order_detail as $order_detail) {
                    $order_detail->price_format = number_format($order_detail->price, 0, '.', ',');
                }
            }
        }
        if(!empty($result)) return $result;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function get_detail_by_auth($input) {
        $user_id = $input['user_id'];
        $id = isset($input['id']) ? $input['id'] : 0;
        $order = $this->model;
        if(empty($user_id) || empty($id)) return false;
        $result = $order->where([
            'deleted' => 0,
            'user_id' => $user_id,
            'id' => $id,
        ])->with([
            'customer' => function($query) {

            },
            'order_detail' => function($query) {
                $query->select('id', 'order_id', 'order_tracking_status_id', 'product_id', 'product_name', 'product_image_link', 'quantity', 'price', 'note');
            },
            'order_tracking_status' => function($query) {
                $query->select('id', 'title', 'code', 'tag_name');
            },
            'country' => function($query) {
                $query->select('id', 'name', 'type', 'status');
            },
            'province' => function($query) {
                $query->select('id', 'name', 'type', 'status');
            },
            'district' => function($query) {
                $query->select('id', 'name', 'type', 'status');
            },
            'ward' => function($query) {
                $query->select('id', 'name', 'type', 'status');
            },
            'payment_method' => function($query) {
                $query->select('id', 'name', 'status');
            }
        ])->select(
            'id', 'code', 'receiver_name', 'receiver_phone', 'receiver_country_id', 'receiver_province_id', 'receiver_district_id', 'receiver_ward_id', 'receiver_address',
            'subtotal', 'total_amount', 'item_quantity', 'discount', 'shipping_id', 'payment_method_id', 'contact_type_id', 'order_tracking_status_id', 'shipping_method_id',
            'transporter_id', 'delivery_date', 'order_date', 'status',
        )->first();
        $result->total_amount_format = number_format($result->total_amount, 0, '.', ',');
        $result->estimated_delivery_date = [
            'date' => date('d/m/Y', strtotime($result->delivery_date)),
            'time' => date('H:m', strtotime($result->delivery_date)),
        ];
        foreach($result->order_detail as $order_detail) {
            $order_detail->price_format = number_format($order_detail->price, 0, '.', ',');
        }
        if(!empty($result)) return $result;
        return false;
    }
}
