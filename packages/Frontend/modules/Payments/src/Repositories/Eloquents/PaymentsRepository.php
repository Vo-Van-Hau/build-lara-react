<?php

namespace Frontend\Payments\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Payments\Interfaces\PaymentsRepositoryInterface;
use Frontend\Payments\Models\Payments;
use Frontend\Payments\Models\PaymentMethods;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class PaymentsRepository extends BaseRepository implements PaymentsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $payment_methods;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Payments $model, PaymentMethods $payment_methods) {
        $this->model = $model;
        $this->payment_methods = $payment_methods;
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
    public function get_by_id($id){
        $result = $this->model->where('id', $id)->first();
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all_methods($keyword = '', $status = []) {
        $result = $this->payment_methods->where(['deleted' => 0])
        ->select('id', 'name', 'icon_link', 'status');
        if(!empty($status)) {
            $result = $result->whereIn('status', $status);
        }
        return $result->paginate(Config::get('packages.frontend.payments.item_per_page', 10));
    }
}
