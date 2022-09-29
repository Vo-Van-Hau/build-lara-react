<?php

namespace Frontend\Orders\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Orders\Interfaces\OrdersRepositoryInterface;
use Frontend\Orders\Models\Orders;
use Frontend\Orders\Models\OrderDetail;
use Frontend\Checkout\Models\Carts;
use Frontend\Checkout\Models\CartDetail;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class OrdersRepository extends BaseRepository implements OrdersRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $order_detail;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Orders $model, OrderDetail $order_detail) {
        $this->model = $model;
        $this->originalModel = $model;
        $this->order_detail = $order_detail;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []){

    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id) {
        $result = $this->model->where("id", $id)->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function store($input) {
        $user_id = $input["user_id"];
        $new = $this->model;
        if(empty($user_id)) return false;
        $cart = Carts::where([
            "user_id" => $user_id,
            "deleted" => 0,
            "status" => 1
        ])->with([
            "cart_detail",
            "user"
        ])->first();
        if(empty($cart)) return false;
        $cart_detail = isset($cart["cart_detail"]) ? $cart["cart_detail"] : [];
        $customer = isset($cart["user"]["customer"]) ? $cart["user"]["customer"] : null;
        $customer_address = isset($customer["customer_address"]) ? $customer["customer_address"] : null;
        foreach($customer_address as $key => $address) {
            if($address["is_default"] == 1) {
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
            $product = $item["product"];
            $quantity = $item["product_quantity"];
            $total_amount += ($product["price"] * $quantity);
        }
        $subtotal = $total_amount;
        // Delivery information
        $new->code = date("YmdHis") . "-" . substr($customer_delivery->phone, -3);
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
        $new->user_id = $customer["id"];
        // Shipping information
        $new->shipping_id = 0;
        // Payment information
        // $new->payment_method_id = $input["payment_method_id"];
        $new->payment_method_id = 1;
        //
        $new->order_tracking_status_id = 1;
        // $new->shipping_method_id = $input["shipping_method_id"]
        $new->shipping_method_id = 1;
        $new->transporter_id = 0;
        $new->delivery_date = date("Y-m-d", strtotime("+7 days"));
        $new->status = 0;
        if($new->save()) {
            $order_id = $new->id;
            foreach($cart_detail as $key => $item) {
                $product = $item["product"];
                $quantity = $item["product_quantity"];
                try {
                    OrderDetail::create([
                        "order_id" => $order_id,
                        "product_id" => $product["id"],
                        "product_name" => $product["name"],
                        "product_image_link" => $product["image_link"],
                        "quantity" => $quantity,
                        "price" => $product["price"]
                    ]);
                }
                catch (\Exception $errors) {
                    $new->delete();
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}