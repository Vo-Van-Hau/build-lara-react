<?php

namespace Modules\Reports\Facades;

use Illuminate\Support\Facades\Facade;

class Reports extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() {
        return "Reports";
    }
}
