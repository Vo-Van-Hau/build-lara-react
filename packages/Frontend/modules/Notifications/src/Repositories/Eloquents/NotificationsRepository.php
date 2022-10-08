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
            if($notifications) return $notifications;
        }
        return [];
    }
}
