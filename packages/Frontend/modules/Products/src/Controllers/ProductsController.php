<?php

namespace Frontend\Products\Controllers;
use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Products\Interfaces\ProductsRepositoryInterface;
use App\Log;
use Illuminate\Support\Facades\DB;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-27
 */
class ProductsController extends ControllerBase {

    protected $ProductsRepository;

    public function __construct(ProductsRepositoryInterface $ProductsRepository) {
        $this->ProductsRepository = $ProductsRepository;
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
            $data_json['products'] = $this->ProductsRepository->get_all($keyword, $status);
            return response()->json($data_json, 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: get product item
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_item(Request $request) {
        if($request->isMethod('post')) {
            $input = request()->all();
            $id = !empty($input['id']) ? intval($input['id']) : '';
            if(empty($id)) return $this->response_base(['status' => false], 'Missing ID !!!', 200);
            $result = $this->ProductsRepository->get_by_id($id);
            return $this->response_base([
                'status' => true,
                'product' => $result
            ], 'Get item successfully !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get all product categories
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_product_categories(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $result = $this->ProductsRepository->get_categories($input);
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'categories' => $result
                ], 'You have got data successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get data !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get list products
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_products_sellers(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $input['seller_id'] = isset($input['seller_id']) ? $input['seller_id'] : 0;
            $result = $this->ProductsRepository->get_products_sellers($input);
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'products' => $result
                ], 'You have got products successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get products !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get products by category
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_products_by_category(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $input['category_id'] = $request->has('keyID') ? $input['keyID'] : 0;
            $result = $this->ProductsRepository->get_products_by_category($input);
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'products' => $result
                ], 'You have got products successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get products !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo get product category by ID
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_product_category(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $input['id'] = $request->has('keyID') ? $input['keyID'] : 0;
            $result = $this->ProductsRepository->get_category_by_id($input);
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'item' => $result
                ], 'You have got data successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get data !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}


