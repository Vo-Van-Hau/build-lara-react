<?php

namespace Modules\Auth\Controllers;

use Modules\Core\Controllers\ControllerBase;
use Modules\Core\Core;
use Illuminate\Support\Facades\Config;
use Modules\Core\Trails\Locates;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-21
 */
class AuthController extends ControllerBase {

    use Locates;

    public function __construct() {

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
                "status" => true,
                "config" => Core::config(),
                "language" => [
                    "locale" => app()->getLocale(),
                    "locales" => Config::get("module.core.locales", []),
                    "lang" => $this->translations("Auth"),
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
        return response()->json([
            "input" => $request->all()
        ]);
        if ($request->isMethod("post")) {
            $validator = $this->validate_login($request);
            if ($validator->fails()) {
                // throw new ApiException(trans('Auth::auth.invalid_credentials'), 400, $validator->getMessageBag()->toArray());
                return response()->json([
                    "status" => "Invalid credentials"
                ]);
            } else {
                $credentials = $this->get_credentials($request);
                return response()->json([
                    "credentials"   => $credentials
                ]);
                try {
                    if (\Auth::guard('module')->attempt($credentials, $request->has('remember'))) {
                        if (!$this->checkTwoFactor(\Auth::guard('module')->id(), $request->email)) {
                            //login
                            \Auth::guard('module')->loginUsingId(\Auth::id(), $request->has('remember'));
                            if (!$this->buildSession()) {
                                throw new ApiException(trans('Auth::auth.failed'), 400, []);
                            }
                            return response()->json(
                                [
                                    'redirect_to' => $this->redirectTo(),
                                    'status' => true,
                                    'message' => trans('Auth::auth.login_success'),
                                ]
                            );
                        } else {
                            //logout keep session two facetor
                            \Auth::guard('module')->logout();
                            return response()->json(
                                [
                                    'status' => true,
                                ]
                            );
                        }
                    } else {
                        throw new ApiException(trans('Auth::auth.failed'), 400, []);
                    }
                } catch (Exception $errors) {
                    // throw new ApiException($e->getMessage(), 500, []);
                }
            }
        }
        return view('Auth::auth.login');
    }

     /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: validation
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Validation\Validator
     */
    protected function validate_login(Request $request) {
        $rules = array(
            $this->login_username() => "required",
            "password" => "required|min:3",
        );
        return \Validator::make($request->all(), $rules);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Get the login username to be used by the controller.
     * @return string
     */
    public function login_username() {
        return property_exists($this, "username") ? $this->username : "email";
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Get the needed authorization credentials from the request.
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    protected function get_credentials(Request $request){
        $login = request()->input("email");
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? "email" : "username";
        return [
            $field => $request->get("email"),
            "password" => $request->password,
        ];
    }
}
