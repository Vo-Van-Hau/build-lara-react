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
    public function all_override(){
        $result = $this->model->where(["deleted" => 0])->select(["id as value", "name as text"])->get();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all($keyword = "", $status = []){
        $result = $this->model->where(["deleted" => 0]);
        if(!empty($status)){
            $result = $result->whereIn("status", $status);
        }
        return $result->with([
                "parent_group:id,parent_group_id,name",
                "users:id,name,username,email,role_id"
            ])
            ->select("id", "name", "status", "parent_group_id", "description")
            ->paginate(Config::get("packages.frontend.checkout.item_per_page", 10));
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return mixed
     */
    public function store($input = []){
        $new = $this->model;
        $new->user_id = $input["user_id"];
        $new->status = 1;
        if($new->save()) {
            $cart_id = $new->id;
            if(isset($input["product"])) {
                $product = $input["product"];
                $this->cart_detail_model->cart_id = $cart_id;
                $this->cart_detail_model->product_id = $product["id"];
                $this->cart_detail_model->product_quantity = $product["quantity"];
                $this->cart_detail_model->status = 1;
                return $this->cart_detail_model->save();
            }
            return false;
        };
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($id){
        $result = $this->model->where("id", $id)
            ->with(["user", "cart_detail"])
            ->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function get_by_user_id($user_id){
        $result = $this->model->where("user_id", $user_id)
            ->with(["user", "cart_detail"])
            ->first();
        return $result;
    }
}
