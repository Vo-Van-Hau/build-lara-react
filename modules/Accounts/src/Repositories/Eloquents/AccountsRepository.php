    <?php

    namespace Modules\Accounts\Repositories\Eloquents;

    use Modules\Core\Repositories\Eloquents\BaseRepository;
    use Modules\Accounts\Interfaces\AccountsRepositoryInterface;
    use Modules\Core\Models\ModelBase;

    class AccountsRepository extends BaseRepository implements AccountsRepositoryInterface {

        /**
         * @var Eloquent | Model
         */
        protected $model;

        /**
         * @var Eloquent | Model
         */
        protected $originalModel;

        /**
         * Repository constructor.
         * @param Model|Eloquent $model
         *
         */
        public function __construct() {}
    }