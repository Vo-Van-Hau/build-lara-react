<?php

namespace Frontend\Orders\Interfaces;

use Frontend\Core\Interfaces\BaseRepositoryInterface;

/**
 * @author <hauvo1709@gmail.com>
 * @package Interface
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-29
 */
interface OrdersRepositoryInterface extends BaseRepositoryInterface {

    public function get_all($keyword = "", $status = []);
    public function get_by_id($id);
}
