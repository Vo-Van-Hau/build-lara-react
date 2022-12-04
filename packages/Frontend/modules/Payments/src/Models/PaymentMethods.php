<?php

namespace Frontend\Payments\Models;

use Frontend\Core\Models\ModelBase;

class PaymentMethods extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'payment_methods';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];

    /**=======================
     *     RelationShip
     *=======================*/
}
