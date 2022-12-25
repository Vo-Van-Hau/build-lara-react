<?php

namespace Frontend\Checkout\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Checkout\Interfaces\CartsRepositoryInterface;
use Frontend\Checkout\Models\Carts;
use Frontend\Checkout\Models\CartDetail;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class CartsRepository extends BaseRepository implements CartsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $cart_detail_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Carts $model, CartDetail $cart_detail_model) {
        $this->model = $model;
        $this->cart_detail_model = $cart_detail_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return Illuminate\Support\Collection
     */
    public function all_override() {
        $result = $this->model->where(['deleted' => 0])->select(['id as value', 'name as text'])->get();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = '', $status = []) {
        $result = $this->model->where(['deleted' => 0]);
        if(!empty($status)){
            $result = $result->whereIn('status', $status);
        }
        return $result->with([
                'parent_group:id,parent_group_id,name',
                'users:id,name,username,email,role_id'
            ])
            ->select('id', 'name', 'status', 'parent_group_id', 'description')
            ->paginate(Config::get('packages.frontend.checkout.item_per_page', 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param mixed $input
     * @return mixed
     */
    public function store($input = null) {
        $cart = $this->model->firstWhere([
            'user_id' => $input['user_id'],
            'ordered' => 0,
            'status' => 1,
            'deleted' => 0
        ]);
        if(empty($cart)) {
            // Don't have an existed cart
            $cart = $this->model;
            $cart->user_id = $input['user_id'];
            $cart->status = 1;
            $cart->ordered = 0;
            if($cart->save()) {
                $cart_id = $cart->id;
                if(isset($input['product_id']) && isset($input['quantity'])) {
                    $this->cart_detail_model->cart_id = $cart_id;
                    $this->cart_detail_model->product_id = $input['product_id'];
                    $this->cart_detail_model->product_quantity = $input['quantity'];
                    $this->cart_detail_model->status = 1;
                    return $this->cart_detail_model->save();
                }
                return false;
            };
        } else {
            $cart_detail = $cart->cart_detail;
            // update an existed item in cart detail
            foreach($cart_detail as $key => $item) {
                if($item->product_id == $input['product_id']) {
                    $item->product_quantity += $input['quantity'];
                    return $item->save();
                }
            }
            // insert a new item in cart detail
            $this->cart_detail_model->cart_id = $cart->id;
            $this->cart_detail_model->product_id = $input['product_id'];
            $this->cart_detail_model->product_quantity = $input['quantity'];
            $this->cart_detail_model->status = 1;
            return $this->cart_detail_model->save();
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id) {
        $result = $this->model->where([
            'id' => $id,
            'status' => 1,
            'deleted' => 0,
        ])
        ->with([
            'user' => function($query) {},
            'cart_detail' => function($query) {}
        ])
        ->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_user_id($user_id) {
        $result = $this->model->with([
            'user' => function($query) {
                $query->select('id', 'avatar', 'name', 'status');
            },
            'cart_detail' => function($query) {
                $query->select('id', 'cart_id', 'product_id', 'product_quantity', 'status');
            }
        ])
        ->select('id', 'user_id', 'ordered', 'status')
        ->firstWhere([
            'user_id' => $user_id,
            'status' => 1,
            'deleted' => 0,
            'ordered' => 0
        ]);
        if(!empty($result)) {
            if(!empty($result['user']) && !empty($result['user']['customer'] && $result['user']['customer']['customer_address'])) {
                foreach($result['user']['customer']['customer_address'] as $key => $address) {
                    if(!is_null($address['province'])) {
                        switch($address['province']['type']) {
                            case 'province':
                                $address['province']['type'] = trans('AddressFrontend::common.0');
                                break;
                            case 'city':
                                $address['province']['type'] = trans('AddressFrontend::common.1');
                                break;
                            default: $address['province']['type'] = trans('AddressFrontend::common.0');
                        }
                    }
                    if(!is_null($address['district'])) {
                        switch($address['district']['type']) {
                            case 'district':
                                $address['district']['type'] = trans('AddressFrontend::common.2');
                                break;
                            case 'city':
                                $address['district']['type'] = trans('AddressFrontend::common.1');
                                break;
                            case 'district_city':
                                $address['district']['type'] = trans('AddressFrontend::common.4');
                                break;
                            case 'town':
                                $address['district']['type'] = trans('AddressFrontend::common.3');
                                break;
                            default: $address['district']['type'] = trans('AddressFrontend::common.2');
                        }
                    }
                    if(!is_null($address['ward'])) {
                        switch($address['ward']['type']) {
                            case 'ward':
                                $address['ward']['type'] = trans('AddressFrontend::common.6');
                                break;
                            case 'commune':
                                $address['ward']['type'] = trans('AddressFrontend::common.5');
                                break;
                            case 'town':
                                $address['ward']['type'] = trans('AddressFrontend::common.7');
                                break;
                            default: $address['ward']['type'] = trans('AddressFrontend::common.6');
                        }
                    }
                }
            }
            /**
             *
             */
            $result->total_amount = 0;
            if(!empty($result->cart_detail)) {
                foreach($result->cart_detail as $key => $item) {
                    $result->cart_detail[$key]->product->price_format = number_format($item->product->price, 0, '.', ',');
                    $result->cart_detail[$key]->total_amount_item = number_format(($item->product->price * $item->product_quantity), 0, '.', ',');
                    /**
                     * Calculate the total amount
                     */
                    $result->total_amount += $item->product->price * $item->product_quantity;
                }
                $result->total_amount_format = number_format($result->total_amount, 0, '.', ',');
            }
            $result->delivery_date = date('Y-m-d 22:00:00', strtotime('+7 days'));
            $result->estimated_delivery_date = [
                'date' => date('d/m/Y', strtotime($result->delivery_date)),
                'time' => date('H:m', strtotime($result->delivery_date)),
            ];
            return $result;
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function remove_item($input) {
        $cart = $this->model->find($input['cart_id']);
        if(empty($cart) || empty($input['product_id'])) return false;
        $existed = CartDetail::where([
            'cart_id' => $cart->id,
            'product_id' => $input['product_id']
        ])->first();
        return $existed->delete();
    }

     /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return boolean
     */
    public function update_quantity_item($input) {
        $cart = $this->model->where([
            'id' => $input['cart_id'],
            'user_id' => $input['user_id']
        ])->first();
        if(empty($cart) || empty($input['product_id']) || empty($input['quantity'])) return false;
        $existed = CartDetail::where([
            'cart_id' => $cart->id,
            'product_id' => $input['product_id']
        ])->first();
        if(!empty($existed)) {
            $existed->product_quantity = intval($input['quantity']) ?? $existed->product_quantity;
            return $existed->save();
        } else {
            return false;
        }
    }
}
