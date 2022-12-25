<?php

namespace Sellers\Auth\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Sellers\Core\Core;
use Illuminate\Support\Facades\Config;
use Sellers\Core\Traits\Locates;
use Sellers\Auth\Controllers\Traits\Auth as AuthTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Sellers\Core\Exceptions\ApiException;
use Sellers\Users\Interfaces\UsersRepositoryInterface;
use Sellers\Sellers\Interfaces\SellersRepositoryInterface;
use Sellers\Shop\Interfaces\ShopRepositoryInterface;
use Sellers\Auth\AuthSellers;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-23
 */
class AuthController extends ControllerBase {

    use Locates, AuthTrait;

    protected $UsersRepository;
    protected $SellersRepository;
    protected $ShopRepository;

    public function __construct(
        UsersRepositoryInterface $UsersRepository,
        SellersRepositoryInterface $SellersRepository,
        ShopRepositoryInterface $ShopRepository
    ) {
        $this->UsersRepository = $UsersRepository;
        $this->SellersRepository = $SellersRepository;
        $this->ShopRepository = $ShopRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function index() {
        return response()->json([], 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param:
     * @return void
     */
    public function get_config() {
        return response()->json(
            [
                'status' => true,
                'config' => Core::config(),
                'language' => [
                    'locale' => app()->getLocale(),
                    'locales' => Config::get('module.core.locales', []),
                    'lang' => $this->translations('Auth'),
                ],
            ], 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: authentication
     * @param \Illuminate\Http\Request
     * @return void
     */
    public function login(Request $request) {
        if ($request->isMethod('post')) {
            $validator = $this->validate_login($request);
            if($validator->fails()) {
                // throw new ApiException(trans('AuthSellers::auth.invalid_credentials'), 400, $validator->getMessageBag()->toArray());
                return $this->response_base(['status' => false], trans('AuthSellers::auth.invalid_credentials'), 200);
            } else {
                $credentials = $this->get_credentials($request);
                try {
                    if(Auth::guard(Config::get('packages.sellers.auth.guard', 'sellers'))->attempt($credentials, $request->has('remember'))) {
                        /**
                         * @description: To log a user into the application by their ID, you may use the loginUsingId method.
                         * This method accepts the primary key of the user you wish to authenticate
                         */
                        $id = Auth::guard(Config::get('packages.sellers.auth.guard', 'sellers'))->id(); // Get the currently authenticated user's ID...
                        Auth::guard(Config::get('packages.sellers.auth.guard', 'sellers'))->loginUsingId($id, $request->has('remember')); // Login and 'remember' the given user...
                        // return $this->build_session();
                        if(!$this->build_session()) {
                            throw new ApiException(trans('AuthSellers::auth.failed'), 400, []);
                        }
                        return response()->json([
                                'redirect_to' => $this->redirectTo(),
                                'status' => true,
                                'message' => trans('AuthSellers::auth.login_success'),
                            ]);
                    } else {
                        // throw new ApiException(trans('AuthSellers::auth.failed'), 400, []);
                        return $this->response_base(['status' => false], trans('AuthSellers::auth.invalid_credentials'), 200);
                    }
                } catch (Exception $errors) {
                    throw new ApiException($errors->getMessage(), 500, []);
                }
            }
        }
        return view('AuthSellers::auth.login');
    }

     /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: validation
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Validation\Validator
     */
    protected function validate_login(Request $request) {
        $rules = array(
            $this->login_username() => 'required',
            'password' => 'required|min:3',
        );
        return Validator::make($request->all(), $rules);
    }

     /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: validation
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Validation\Validator
     */
    protected function validate_register(Request $request) {
        $rules = array(
            $this->login_username() => 'required',
            'password' => 'required|min:3',
        );
        return Validator::make($request->all(), $rules);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Get the login username to be used by the controller.
     * @return string
     */
    public function login_username() {
        return property_exists($this, 'username') ? $this->username : 'email';
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Get the needed authorization credentials from the request.
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    protected function get_credentials(Request $request){
        $login = request()->input('email');
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        return [
            $field => $request->get('email'),
            'password' => $request->password,
        ];
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: redirectTo
     * @return void
     */
    protected function redirectTo($to = '') {
        if(!empty($to)) {
            return Core::backendURL() . $to;
        }
        return Core::backendURL() . '/dashboard/dashboard';
    }


    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function authenticate_user(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthSellers::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->UsersRepository->get_by_id($input['user_id']);
            if($result) {
                $result['is_login'] = true;
                if(!empty($result)) {

                }
                return $this->response_base([
                    'status' => true,
                    'user' => $result
                ], 'You have got user successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get user !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: register sellers account
     * @param \Illuminate\Http\Request
     * @return void
     */
    public function register(Request $request) {
        if($request->isMethod('post')) {
            $validator = $this->validate_register($request);
            if($validator->fails()) {
                throw new ApiException(trans('AuthSellers::auth.invalid_credentials'), 400, $validator->getMessageBag()->toArray());
            } else {
                $input = $request->all();
                $check_email = $this->checkUniqueEmail($input['email']);
                if(!$check_email) return $this->response_base(['status' => false], 'Email already exists !!!', 200);
                $check_username = $this->checkUniqueUsername($input['username']);
                if(!$check_username) return $this->response_base(['status' => false], 'Username already exists !!!', 200);
                $credentials = array(
                    'email' => isset($input['email']) ? $input['email'] : '',
                    'name' => isset($input['fullname']) ? $input['fullname'] : '',
                    'username' => isset($input['username']) ? $input['username'] : '',
                    'status' => 1,
                    'password' => isset($input['password']) ? $input['password'] : '',
                    'role_id' => 19, // Role ID for Sellers,
                    'special' => 0,
                    'type' => 0,
                    'is_publisher' => 0,
                    'avatar' => isset($input['avatar']) ? $input['avatar'] : Config::get('packages.frontend.core.app_url').'/userdata/avatar/default_user_avatar_v1.jpg',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                );
                try {
                    $new = $this->UsersRepository->store($credentials);
                    if(!empty($new)) {
                        $userID = $new->id ?? 0;
                        $credentials = array(
                            'user_id' => isset($userID) ? $userID : 0,
                            'fullname' => isset($input['fullname']) ? $input['fullname'] : '',
                            'phone' => isset($input['phone']) ? $input['phone'] : '',
                            'date_of_birth' => date('Y-m-d H:i:s'),
                            'status' => isset($userID) ? 1 : 0,
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s'),
                        );
                        $new = $this->SellersRepository->store($credentials);
                        if(!empty($new)) {
                            $sellerID = $new->id ?? 0;
                            $credentials = array(
                                'user_id' => isset($userID) ? $userID : 0,
                                'seller_id' => isset($sellerID) ? $sellerID : 0,
                                'name' => isset($input['store_name']) ? $input['store_name'] : '',
                                'brand_logo' => isset($input['store_brand_logo']) ? $input['store_brand_logo'] : '',
                                'description' => isset($input['store_description']) ? $input['store_description'] : '',
                                'status' => isset($sellerID) ? 1 : 0,
                                'category_id' => isset($input['category_id']) ? $input['category_id'] : 0,
                                'created_at' => date('Y-m-d H:i:s'),
                                'updated_at' => date('Y-m-d H:i:s'),
                                'joined_date' => date('Y-m-d H:i:s'),
                            );
                            $new = $this->ShopRepository->create_store($credentials);
                            return response()->json([
                                'redirect_to' => $this->redirectTo('/login'),
                                'status' => true,
                                'message' => trans('AuthSellers::auth.login_success'),
                            ]);
                        }
                        return $this->response_base(['status' => false], 'You have failed to store new item!!!', 200);
                    }
                } catch (Exception $errors) {
                    throw new ApiException($errors->getMessage(), 500, []);
                }
            }
        }
        return view('AuthSellers::auth.login');
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo check unique email
     * @param string $email
     * @return boolean
     */
    public function checkUniqueEmail($email) {
        $count = $this->UsersRepository->findbyemail($email);
        if($count == 0) return true;
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo check unique username
     * @param string $email
     * @return boolean
     */
    public function checkUniqueUsername($username) {
        $count = $this->UsersRepository->findbyusername($username);
        if($count == 0) return true;
        return false;
    }
}
