<?php

namespace Frontend\Sellers\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Sellers\Interfaces\SellersRepositoryInterface;
use App\Log;
use Illuminate\Support\Facades\DB;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-11-01
 */
class SellersController extends ControllerBase {

    protected $SellersRepository;

    public function __construct(SellersRepositoryInterface $SellersRepository) {
        $this->SellersRepository = $SellersRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get information about specific shop
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_shop(Request $request) {
        if($request->isMethod('post')) {
            $input = request()->all();
            $seller_id = isset($input['seller_id']) ? $input['seller_id'] : 0;
            if(empty($seller_id)) return $this->response_base(['status' => false], 'Missing ID !!!', 200);
            $result = $this->SellersRepository->get_shop($input);
            return $this->response_base([
                'status' => true,
                'shop' => $result
            ], 'Get shop successfully !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}


