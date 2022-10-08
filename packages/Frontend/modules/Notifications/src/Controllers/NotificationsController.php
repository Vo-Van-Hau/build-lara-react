<?php

namespace Frontend\Notifications\Controllers;

use Illuminate\Http\Request;
use Frontend\Core\Controllers\ControllerBase;
use Frontend\Notifications\Interfaces\NotificationsRepositoryInterface;
use Frontend\Auth\AuthFrontend;

/**
 * @author <hauvo1709@gmail.com>
 * @package Controller
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-10-06
 */
class NotificationsController extends ControllerBase {

    protected $NotificationsRepository;

    public function __construct(NotificationsRepositoryInterface $NotificationsRepository) {
        $this->NotificationsRepository = $NotificationsRepository;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo storage new group
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function get_notifications_by_auth(Request $request) {
        if($request->isMethod("post")) {
            $input = $request->all();
            $auth_id = AuthFrontend::info("id");
            $input["user_id"] = isset($auth_id) ? $auth_id : null;
            $result = $this->NotificationsRepository->get_notifications_by_auth($input["user_id"]);
            if($result) {
                return $this->response_base([
                    "status" => true,
                    "notifications" => $result
            ], "You have got notifications successfully !!!", 200);
            }
            return $this->response_base(["status" => false], "You have failed to get notifications !!!", 200);
        }
        return $this->response_base(["status" => false], "Access denied !", 200);
    }
}


