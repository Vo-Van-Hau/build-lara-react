<?php

namespace Frontend\Customer\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Customer\Interfaces\CustomerRepositoryInterface;
use Frontend\Auth\AuthFrontend;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-10-03
 */
class CustomerController extends ControllerBase {

    protected $CustomerRepository;

    public function __construct(CustomerRepositoryInterface $CustomerRepository) {
        $this->CustomerRepository = $CustomerRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_by_auth(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthFrontend::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            $result = $this->CustomerRepository->get_by_user_id($input["user_id"]);
            if($result) {
                return $this->response_base([
                    "status" => true,
                    "account" => $result
            ], "You have got account information successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to get information !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}


