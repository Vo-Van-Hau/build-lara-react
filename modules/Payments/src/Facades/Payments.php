    <?php

    namespace Modules\Payments\Facades;

    use Illuminate\Support\Facades\Facade;

    /**
     * @author <hauvo1709@gmail.com>
     * @package Controller
     * @copyright 2022 http://www.cayluaviet.online/
     * @license License 1.0
     * @version Release: 1.00.000
     * @link http://www.docs.v1.cayluaviet.online/
     * @since 2022-09-26
     */
    class Payments extends Facade {

        /**
         * Get the registered name of the component.
         *
         * @return string
         */
        protected static function getFacadeAccessor() {
            return "Payments";
        }
    }