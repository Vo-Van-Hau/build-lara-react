<?php

namespace Modules\Core\Exceptions;

use Exception;

class ApiException extends Exception {

    public $data = [];

    public function __construct($message = "", $code = 200, $data = []) {

        $this->data = $data;
        
        parent::__construct($message, $code);
    }
}
