<?php

namespace Sellers\Settings\Controllers;

use Sellers\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Sellers\Products\Interfaces\SettingsRepositoryInterface;
use Sellers\Auth\AuthSellers;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-12-18
 */
class SettingsController extends ControllerBase {

    protected $SettingsRepository;

    public function __construct(SettingsRepositoryInterface $SettingsRepository) {
        $this->SettingsRepository = $SettingsRepository;
    }
}
