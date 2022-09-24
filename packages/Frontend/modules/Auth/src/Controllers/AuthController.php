<?php

namespace Frontend\Auth\Controllers;

use Frontend\Core\Controllers\ControllerBase;
use Frontend\Core\Core;
use Illuminate\Support\Facades\Config;
use Frontend\Core\Traits\Locates;
use Frontend\Auth\Controllers\Traits\Auth as AuthTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Frontend\Core\Exceptions\ApiException;
use Frontend\Users\Interfaces\UsersRepositoryInterface;

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

    protected $usersRepository;

    public function __construct(UsersRepositoryInterface $usersRepository) {
        $this->usersRepository = $usersRepository;
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
        if ($request->isMethod("post")) {
            $validator = $this->validate_login($request);
            if ($validator->fails()) {
                throw new ApiException(trans("Auth::auth.invalid_credentials"), 400, $validator->getMessageBag()->toArray());
            } else {
                $credentials = $this->get_credentials($request);
                try {
                    if (Auth::guard(Config::get("module.auth.guard", "module"))->attempt($credentials, $request->has("remember"))) {
                        /**
                         * @description: To log a user into the application by their ID, you may use the loginUsingId method.
                         * This method accepts the primary key of the user you wish to authenticate
                         */
                        $id = Auth::guard(Config::get("module.auth.guard", "module"))->id(); // Get the currently authenticated user's ID...
                        Auth::guard(Config::get("module.auth.guard", "module"))->loginUsingId($id, $request->has("remember")); // Login and "remember" the given user...
                        if (!$this->build_session()) {
                            throw new ApiException(trans("Auth::auth.failed"), 400, []);
                        }
                        return response()->json([
                                "redirect_to" => $this->redirectTo(),
                                "status" => true,
                                "message" => trans("Auth::auth.login_success"),
                            ]);
                    } else {
                        throw new ApiException(trans("Auth::auth.failed"), 400, []);
                    }
                } catch (Exception $errors) {
                    throw new ApiException($errors->getMessage(), 500, []);
                }
            }
        }
        return view("Auth::auth.login");
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
        return Validator::make($request->all(), $rules);
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

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: redirectTo
     * @return void
     */
    protected function redirectTo() {
        return Core::backendURL() . "/dashboard";
    }
}
