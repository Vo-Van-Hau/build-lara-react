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
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            $result = $this->NotificationsRepository->get_notifications_by_auth($input['user_id']);
            if($result) {
                return $this->response_base([
                    'status' => true,
                    'notifications' => $result
                ], 'You have got notifications successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to get notifications !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo Marking Notifications As Read
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function mask_as_read_notification(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['id'] = isset($input['id']) ? $input['id'] : null;
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            if(is_null($input['user_id']) || is_null($input['id'])) {
                return $this->response_base(['status' => false], 'You have failed to mask as read notifications !!!', 200);
            }
            $result = $this->NotificationsRepository->mask_as_read_notification($input['user_id'], $input['id']);
            if($result) {
                return $this->response_base([
                    'status' => true,
                ], 'You have masked as read notifications successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to mask as read notifications !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo Marking Notifications As Read
     * @param \Illuminate\Support\Facades\Request $request
     * @return void
     */
    public function delete_notification(Request $request) {
        if($request->isMethod('post')) {
            $input = $request->all();
            $auth_id = AuthFrontend::info('id');
            $input['id'] = isset($input['id']) ? $input['id'] : null;
            $input['user_id'] = isset($auth_id) ? $auth_id : null;
            if(is_null($input['user_id']) || is_null($input['id'])) {
                return $this->response_base(['status' => false], 'You have failed to delete notifications !!!', 200);
            }
            $result = $this->NotificationsRepository->delete_notification($input['user_id'], $input['id']);
            if($result) {
                return $this->response_base([
                    'status' => true,
                ], 'You have deleted notifications successfully !!!', 200);
            }
            return $this->response_base(['status' => false], 'You have failed to delete notifications !!!', 200);
        }
        return $this->response_base(['status' => false], 'Access denied !', 200);
    }
}


