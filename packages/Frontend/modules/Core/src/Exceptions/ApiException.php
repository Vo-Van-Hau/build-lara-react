<?php

namespace Frontend\Core\Exceptions;

use Exception;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-21
 */
class ApiException extends Exception {

    public $data = [];

    public function __construct($message = "", $code = 200, $data = []) {
        $this->data = $data;
        parent::__construct($message, $code);
    }
}
