<?php

namespace Frontend\Shop\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Shop\Interfaces\ShopRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Frontend\Auth\AuthFrontend;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-12-24
 */
class ShopController extends ControllerBase {

    protected ShopRepositoryInterface $ShopRepository;

    public function __construct(ShopRepositoryInterface $ShopRepository) {
        $this->ShopRepository = $ShopRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: 
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function follow_store(Request $request) {
        if($request->isMethod('post')) {
            $input = request()->all();
            $input['store_id'] = isset($input['store_id']) ? $input['store_id'] : 0;
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->ShopRepository->follow_store($input);
            if(!empty($result)) {
                return $this->response_base([
                    'status' => true,
                    'follow' => $result,
                ], 'Follow store successfully...!', 200);
            } 
            return $this->response_base([
                'status' => false,
                'follow' => $result,
            ], 'Fail to follow store...!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}


