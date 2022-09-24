<?php

namespace Frontend\Auth\Facades;

use Illuminate\Support\Facades\Facade;

class AuthFrontend extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() {
        return "AuthFrontend";
    }
}
