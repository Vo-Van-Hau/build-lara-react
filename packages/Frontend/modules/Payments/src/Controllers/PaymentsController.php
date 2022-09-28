<?php

namespace Frontend\Payments\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Payments\Interfaces\PaymentsRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-28
 */
class PaymentsController extends ControllerBase {

    protected $PaymentsRepository;

    public function __construct(PaymentsRepositoryInterface $PaymentsRepository) {
        $this->PaymentsRepository = $PaymentsRepository;
    }
}


