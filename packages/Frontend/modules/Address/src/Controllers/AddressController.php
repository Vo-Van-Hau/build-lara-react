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
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthFrontend::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            $result = $this->AddressRepository->get_customer_address($input);
            if(!empty($result) && isset($result["customer_address"])) {
                return $this->response_base([
                    "status" => true,
                    "address" => $result["customer_address"]
                ], "You have got address successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to get address !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}


