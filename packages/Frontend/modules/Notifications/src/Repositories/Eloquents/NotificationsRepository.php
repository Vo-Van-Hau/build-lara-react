<?php

namespace Frontend\Notifications\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Notifications\Interfaces\NotificationsRepositoryInterface;
use Frontend\Notifications\Models\Notifications;
use Modules\Users\Models\Users;
use Illuminate\Support\Facades\Config;

class NotificationsRepository extends BaseRepository implements NotificationsRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected $users_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Notifications $model, Users $users_model) {
        $this->model = $model;
        $this->originalModel = $model;
        $this->users_model = $users_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $user_id
     * @return Illuminate\Support\Collection
     */
    public function get_notifications_by_auth($user_id) {
        $user = $this->users_model->find($user_id);
        if(!empty($user)) {
            $notifications = $user->notifications;
            if($notifications) {
                foreach($notifications as $key => $item) {
                    $notifications[$key]->created_at = date_format(date_create($item->created_at), 'd-m-Y H:m:s');
                }
                return $notifications;
            };
        }
        return [];
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $user_id
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function mask_as_read_notification($user_id, $id) {
        $user = $this->users_model->find($user_id);
        if(!empty($user)) {
            $notifications = $user->notifications;
            foreach($notifications as $notification) {
                if($notification->id == $id) {
                    $notification->markAsRead();
                    break;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $user_id
     * @param int $id
     * @return Illuminate\Support\Collection
     */
    public function delete_notification($user_id, $id) {
        $user = $this->users_model->find($user_id);
        if(!empty($user)) {
            $notifications = $user->notifications;
            foreach($notifications as $notification) {
                if($notification->id == $id) {
                    $notification->delete();
                    break;
                }
            }
            return true;
        }
        return false;
    }
}
