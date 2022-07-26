<?php

namespace Frontend\Address\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Address\Interfaces\AddressRepositoryInterface;
use Frontend\Auth\AuthFrontend;
use Frontend\Address\Models\CustomerAddress;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-10-09
 */
class AddressController extends ControllerBase {

    protected $AddressRepository;

    public function __construct(AddressRepositoryInterface $AddressRepository) {
        $this->AddressRepository = $AddressRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get address
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_customer_address(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->AddressRepository->get_customer_address($input);
            if(!empty($result) && isset($result['customer_address'])) {
                return $this->response_base([
                    'status' => true,
                    'address' => $result['customer_address']
                ], 'You have got address successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get address !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get areas
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_areas(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $result = $this->AddressRepository->get_areas($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                    'areas' => $result
                ], 'You have got areas successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get areas !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get districs
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_districs_by_province(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $input['province_id'] = isset($input['province_id']) ? $input['province_id'] : null;
            $result = $this->AddressRepository->get_districs_by_province($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                    'districts' => $result
                ], 'You have got districts successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get districts !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get districs
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_wards_by_district(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $input['district_id'] = isset($input['district_id']) ? $input['district_id'] : null;
            $result = $this->AddressRepository->get_wards_by_district($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                    'wards' => $result
                ], 'You have got wards successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get wards !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo save customer-address
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function save(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->AddressRepository->save_customer_address($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                ], 'You have saved address successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to save address !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo delete an existed customer-address
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function delete_address(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->AddressRepository->delete_customer_address($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                ], 'You have deleted an existed address successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to delete an existed address !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get address item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_item(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->AddressRepository->get_by_id($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                    'item' => $result,
                ], 'You have got item successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get item !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}


