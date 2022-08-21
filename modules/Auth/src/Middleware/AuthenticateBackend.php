<?php

namespace Modules\Auth\Middleware;

use Closure;
use Modules\Core\Helpers\Module;
use Illuminate\Http\Request;
use Modules\Core\Exceptions\ApiException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

/**
 * @author <hauvo1709@gmail.com>
 * @package Middleware
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-21
 */
class AuthenticateBackend {

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param  string|null $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null){
        if (!Auth::guard("module")->check() || ($auth = request()->session()->get("auth_module")) == null) {
            if (strtolower($request->header("Content-Type")) == "application/json") {
                throw new ApiException(trans("Auth::auth.the_authentication_token_was_expired"), 401, []);
            }
            else {
                $url = Config::get("module.core.backend_url") . "/auth/login";
                return redirect()->guest($url);
            }
        }
        return $next($request);
    }
}
