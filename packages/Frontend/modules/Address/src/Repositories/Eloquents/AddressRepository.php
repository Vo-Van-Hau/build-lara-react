<?php

namespace Frontend\Address\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Address\Interfaces\AddressRepositoryInterface;
use Frontend\Address\Models\CustomerAddress;
use Frontend\Customer\Models\Customer;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class AddressRepository extends BaseRepository implements AddressRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $customer_address_model;
    protected $customer;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(CustomerAddress $customer_address_model, Customer $customer) {
        $this->customer_address_model = $customer_address_model;
        $this->customer = $customer;
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
        return null;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function get_customer_address($input) {
        $user_id = $input["user_id"];
        $customer = $this->customer;
        if(empty($user_id)) return false;
        $result = $customer->where([
            "status"  => 1,
            "deleted" => 0,
            "user_id" => $user_id
        ])->with([
            "customer_address" => function($query) {
                /**
                 * @note: Eager Loading Specific Columns->When using this feature,
                 * you should always include the id column and any relevant foreign key columns in the list of columns you wish to retrieve.
                 */
                $query->with([
                    "area:id,name,type",
                    "country:id,name,type",
                    "province:id,name,type",
                    "district:id,name,type",
                    "ward:id,name,type"
                ]);
            }
        ])->first();
        if(!empty($result)) {
            if(!empty($result["customer_address"])) {
                foreach($result["customer_address"] as $key => $address) {
                    if(!is_null($address["province"])) {
                        switch($address["province"]["type"]) {
                            case "province":
                                $address["province"]["type"] = trans("AddressFrontend::common.0");
                                break;
                            case "city":
                                $address["province"]["type"] = trans("AddressFrontend::common.1");
                                break;
                            default: $address["province"]["type"] = trans("AddressFrontend::common.0");
                        }
                    }
                    if(!is_null($address["district"])) {
                        switch($address["district"]["type"]) {
                            case "district":
                                $address["district"]["type"] = trans("AddressFrontend::common.2");
                                break;
                            case "city":
                                $address["district"]["type"] = trans("AddressFrontend::common.1");
                                break;
                            case "district_city":
                                $address["district"]["type"] = trans("AddressFrontend::common.4");
                                break;
                            case "town":
                                $address["district"]["type"] = trans("AddressFrontend::common.3");
                                break;
                            default: $address["district"]["type"] = trans("AddressFrontend::common.2");
                        }
                    }
                    if(!is_null($address["ward"])) {
                        switch($address["ward"]["type"]) {
                            case "ward":
                                $address["ward"]["type"] = trans("AddressFrontend::common.6");
                                break;
                            case "commune":
                                $address["ward"]["type"] = trans("AddressFrontend::common.5");
                                break;
                            case "town":
                                $address["ward"]["type"] = trans("AddressFrontend::common.7");
                                break;
                            default: $address["ward"]["type"] = trans("AddressFrontend::common.6");
                        }
                    }
                }
            }
            return $result;
        }
        return false;
    }
}
