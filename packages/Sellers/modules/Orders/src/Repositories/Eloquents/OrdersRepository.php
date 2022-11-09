<?php

namespace Sellers\Orders\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Orders\Interfaces\OrdersRepositoryInterface;
use Sellers\Orders\Models\Orders;
use Sellers\Orders\Models\OrderDetail;
use Sellers\Orders\Models\OrderTrackingStatus;
use Sellers\Sellers\Models\Sellers;
use Sellers\Products\Models\Products;
use Illuminate\Support\Facades\Config;

class OrdersRepository extends BaseRepository implements OrdersRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $order_detail_model;
    protected $sellers_model;
    protected Products $products_model;
    protected OrderTrackingStatus $order_tracking_status_model;

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
        Orders $model, OrderDetail $order_detail_model, Sellers $sellers_model, Products $products_model,
        OrderTrackingStatus $order_tracking_status_model
    ) {
        $this->model = $model;
        $this->order_detail_model = $order_detail_model;
        $this->sellers_model = $sellers_model;
        $this->products_model = $products_model;
        $this->order_tracking_status_model = $order_tracking_status_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []) {
        $result = $this->model->where(["deleted" => 0]);
        if (!empty($status)) {
            $result = $result->whereIn("status", $status);
        }
        return $result
            ->paginate(Config::get("packages.sellers.orders.item_per_page", 10));
    }


    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id) {
        $result = $this->model->where("id", $id)
            ->with("order_detail")->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @param array $input
     * @return boolean
     */
    public function update($id, $input = []) {
        $existed = $this->model->find($id);
        if (empty($existed)) return false;
        $existed->name = $input["name"];
        $existed->status = $input["status"];
        $existed->parent_group_id = $input["parent_group_id"];
        $existed->description = $input["description"];
        return $existed->update(); // return boolean
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function get_orders_sellers($input) {
        $user_id = $input["user_id"];
        $seller = $this->sellers_model->where([
            "status" => 1,
            "deleted" => 0,
            "user_id" => $user_id
        ])->first();
        if(is_null($user_id) || is_null($seller)) return false;
        $order_detail_list = $this->order_detail_model->join('orders', 'orders.id', '=', 'order_detail.order_id')
        ->join('products', 'order_detail.product_id', '=', 'products.id')
        ->where([
            'products.seller_id' => $seller->id
        ])
        ->selectRaw('order_detail.*')
        ->get();
        $orders_list = [];
        foreach($order_detail_list as $key => $order_detail) {
            $order_detail['product'] = $this->products_model->find($order_detail['product_id']);
            $order_detail['order_tracking_status'] = $this->order_tracking_status_model->find($order_detail['order_tracking_status_id']);
            $orders_list[$order_detail['order_id']]['order_detail'][] = $order_detail;
        }
        foreach($orders_list as $key => $_order) {
            $order = $this->model->find($key);
            if(!empty($order)) {
                $order['order_detail'] = $_order['order_detail'];
                $result[] = $order;
            }
        }
        return $result ?? [];
    }
}
