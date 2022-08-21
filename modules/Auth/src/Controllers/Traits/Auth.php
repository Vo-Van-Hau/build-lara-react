<?php

namespace Modules\Auth\Controllers\Traits;

/**
 * @author <hauvo1709@gmail.com>
 * @package Traits
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-21
 */
trait Auth {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: Build session login
     * @return boolean
     */
    public function build_session() {
        if (empty(\Auth::guard("module")->check())) return false;
        $user = \Auth::guard("module")->getUser();
        request()->session()->put("auth_module", $user);
        request()->session()->save();
        return true;
    }
}
