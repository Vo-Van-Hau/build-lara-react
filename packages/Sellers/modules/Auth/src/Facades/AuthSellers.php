<?php

namespace Sellers\Auth\Facades;

use Illuminate\Support\Facades\Facade;

class AuthSellers extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() {
        return "AuthSellers";
    }
}
