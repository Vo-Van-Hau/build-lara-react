<?php

namespace Modules\Sellers\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Modules\Auth\AuthCMS;
use Modules\Sellers\Interfaces\SellersRepositoryInterface;
use Modules\Users\Interfaces\RolesRepositoryInterface;



/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-12-10
 */
class SellersController extends ControllerBase {

    protected SellersRepositoryInterface $SellersRepository;
    protected RolesRepositoryInterface $RolesRepository;

    public function __construct(
        SellersRepositoryInterface $SellersRepository,
        RolesRepositoryInterface $RolesRepository
    ) {
        $this->SellersRepository = $SellersRepository;
        $this->RolesRepository = $RolesRepository;
        parent::__construct();
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function index(){
        return response()->json([], 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_config(Request $request) {
        if($request->isMethod('post')) {
            $data = [
                'config' => [
                    'status' => config('module.sellers.status_list'),
                    'account_type' => config('module.sellers.is_publisher'),
                    'users_type' => config('module.sellers.users_type'),
                    'currencies' => config('module.sellers.currencies'),
                    'roles' => $this->RolesRepository->all_override(),
                    'user' => AuthCMS::info(),
                ]
            ];
            return response()->json($data, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_list(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $keyword = isset($input['keyword']) ? $input['keyword'] : '';
            $status = isset($input['status']) ? $input['status'] : [];
            $group = isset($input['group']) ? $input['group'] : [];
            $data_json['sellers'] = $this->SellersRepository->get_all_users($keyword, $status, $group);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function accept_seller(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $result = $this->SellersRepository->handle_accept_seller($input);
            if($result) {
                return $this->response_base([
                    'status' => true,
                ], 'You have updated data successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to update date !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}
