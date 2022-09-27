<?php

namespace Modules\Contacts\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Contacts\Interfaces\ContactsRepositoryInterface;
use Modules\Core\Models\ModelBase;

class ContactsRepository extends BaseRepository implements ContactsRepositoryInterface {

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
