<?php

namespace Frontend\Address\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Address\Interfaces\AddressRepositoryInterface;
use Frontend\Address\Models\CustomerAddress;
use Frontend\Customer\Models\Customer;
use Frontend\Address\Models\Areas;
use Frontend\Address\Models\Countries;
use Frontend\Address\Models\Provinces;
use Frontend\Address\Models\Districts;
use Frontend\Address\Models\Wards;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;

class AddressRepository extends BaseRepository implements AddressRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected CustomerAddress $customer_address_model;
    protected $customer_model;
    protected $areas_model;
    protected $countries_model;
    protected $provinces_model;
    protected $districts_model;
    protected $wards_model;

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
        CustomerAddress $customer_address_model,
        Customer $customer_model,
        Areas $areas_model,
        Countries $countries_model,
        Provinces $provinces_model,
        Districts $districts_model,
        Wards $wards_model
    ) {
        $this->customer_address_model = $customer_address_model;
        $this->customer_model = $customer_model;
        $this->areas_model = $areas_model;
        $this->countries_model = $countries_model;
        $this->provinces_model = $provinces_model;
        $this->districts_model = $districts_model;
        $this->wards_model = $wards_model;
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
     * @param array $data
     * @return Illuminate\Support\Collection
     */
    public function get_by_id($data) {
        $user_id = $data['user_id'];
        $id = isset($data['id']) ? $data['id'] : 0;
        if(empty($user_id)) return false;
        $result = $this->customer_address_model
        ->where([
            'status' => 1,
            'deleted' => 0
        ])
        ->with([
            'area' => function ($query) {

            },
            'country' => function ($query) {

            },
            'province' => function ($query) {

            },
            'district' => function ($query) {

            },
            'ward' => function ($query) {

            }
        ])
        ->find($id);
        if(empty($result)) return false;
        return $result;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function get_customer_address($input) {
        $user_id = $input['user_id'];
        $customer = $this->customer_model;
        if(empty($user_id)) return false;
        $result = $customer->where([
            'status'  => 1,
            'deleted' => 0,
            'user_id' => $user_id
        ])->with([
            'customer_address' => function($query) {
                /**
                 * @note: Eager Loading Specific Columns->When using this feature,
                 * you should always include the id column and any relevant foreign key columns in the list of columns you wish to retrieve.
                 */
                $query->with([
                    'area:id,name,type',
                    'country:id,name,type',
                    'province:id,name,type',
                    'district:id,name,type',
                    'ward:id,name,type'
                ]);
            }
        ])->first();
        if(!empty($result)) {
            if(!empty($result['customer_address'])) {
                foreach($result['customer_address'] as $key => $address) {
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
    public function get_areas($input) {
        $result = $this->areas_model->where([
            'id' => 3
        ])->first();
        $result['countries'] = $this->countries_model->where([
            'area_id' => $result->id
        ])->with([
            'provinces' => function($query) {}
        ])->first();
        if(!empty($result)) {
            $result['countries']['distincts'] = [];
            $result['countries']['wards'] = [];
            return $result;
        };
        return false;
    }

     /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function get_districs_by_province($input) {
        $user_id = $input['user_id'];
        $province_id = $input['province_id'];
        if(empty($user_id)) return false;
        $result = $this->districts_model->where([
            'status' => 1,
            'deleted' => 0,
            'province_id' => $province_id
        ])->get();
        if(!empty($result)) return $result;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function get_wards_by_district($input) {
        $user_id = $input['user_id'];
        $district_id = $input['district_id'];
        if(empty($user_id)) return false;
        $result = $this->wards_model->where([
            'status' => 1,
            'deleted' => 0,
            'district_id' => $district_id
        ])->get();
        if(!empty($result)) return $result;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function save_customer_address($input) {
        $user_id = $input['user_id'];
        $id = isset($input['keyID']) ? $input['keyID'] : 0;
        $customer = $this->customer_model;
        if(empty($user_id)) return false;
        $customer = $customer->where([
            'status'  => 1,
            'deleted' => 0,
            'user_id' => $user_id
        ])->first();
        if(!empty($customer)) {
            $is_default = isset($input['is_default']) ? $input['is_default'] : 0;
            $check = $this->customer_address_model;
            $check = $check->where([
                'customer_id' => $customer->id,
                'status'  => 1,
                'deleted' => 0,
            ])->count();
            if(empty($check)) {
                $is_default = 1;
            }
            if(empty($id)) {
                $new = $this->customer_address_model;
                $new->customer_id = $customer->id;
                $new->customer_name = isset($input['customer_name']) ? $input['customer_name'] : '';
                $new->company_name = isset($input['company_name']) ? $input['company_name'] : '';
                $new->phone = isset($input['phone']) ? $input['phone'] : '';
                $new->area_id = 3;
                $new->country_id = 1;
                $new->province_id = isset($input['province_id']) ? $input['province_id'] : 0;
                $new->district_id = isset($input['district_id']) ? $input['district_id'] : 0;
                $new->ward_id = isset($input['ward_id']) ? $input['ward_id'] : 0;
                $new->address = isset($input['address']) ? $input['address'] : '';
                $new->delivery_address_type = isset($input['address']) ? $input['delivery_address_type'] : '';
                $new->is_default = $is_default;
                $new->status = 1;
                if($new) {
                    if(!empty($is_default)) {
                        $query = $this->customer_address_model;
                        $query->where([
                            'status' => 1,
                            'deleted' => 0,
                            'customer_id' => $customer->id,
                        ])->where('id', '!=', $save->id)->update([
                            'is_default' => 0,
                        ]);
                    }
                    return true;
                }
            } else {
                $existed = $this->customer_address_model->where([
                    'status' => 1,
                    'deleted' => 0,
                ])->find($id);
                if(!empty($existed)) {
                    $existed->customer_name = isset($input['customer_name']) ? $input['customer_name'] : '';
                    $existed->company_name = isset($input['company_name']) ? $input['company_name'] : '';
                    $existed->phone = isset($input['phone']) ? $input['phone'] : '';
                    $existed->area_id = 3;
                    $existed->country_id = 1;
                    $existed->province_id = isset($input['province_id']) ? $input['province_id'] : 0;
                    $existed->district_id = isset($input['district_id']) ? $input['district_id'] : 0;
                    $existed->ward_id = isset($input['ward_id']) ? $input['ward_id'] : 0;
                    $existed->address = isset($input['address']) ? $input['address'] : '';
                    $existed->delivery_address_type = isset($input['address']) ? $input['delivery_address_type'] : '';
                    $existed->is_default = $is_default;
                    $existed->status = 1;
                    $existed->updated_at = date('Y-m-d H:i:s');
                    $affected = $existed->save();
                    if($affected) return $affected;
                }
            }
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function delete_customer_address($input) {
        $user_id = $input['user_id'];
        $id = isset($input['id']) ? $input['id'] : 0;
        $customer = $this->customer_model;
        if(empty($user_id)) return false;
        $customer = $customer->where([
            'status'  => 1,
            'deleted' => 0,
            'user_id' => $user_id
        ])->first();
        if(!empty($customer) && !empty($id)) {
            $existed = $this->customer_address_model->find($id);
            $is_default = $existed->is_default;
            if(!empty($existed)) {
                // If address isn't default, so remove it.
                if(empty($is_default)) {
                    if($existed->delete()) return true;
                    return false;
                }
                return false;
            }
            return false;
        }
        return false;
    }
}
