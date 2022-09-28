<?php
/**
 * User: Sy Dai
 * Date: 04-Apr-17
 * Time: 14:59
 */

namespace App;

use App\TM;
use Illuminate\Support\Facades\DB;

class Log
{
    protected static $DELETED = "DELETED";
    protected static $CREATED = "CREATED";
    protected static $UPDATED = "UPDATED";
    protected static $CHANGED = "CHANGED";
    protected static $VIEW = "VIEW";
    protected static $UPLOAD = "UPLOAD";
    protected static $MOVE = "MOVE";

    /**
     * @param $target
     * @param null $description
     */
    static function view($target, $description = null)
    {
        self::process(self::$VIEW, $target, $description);
    }

    /**
     * @param $target
     * @param $created_data
     */
    static function create($target, $description = null, $old_data = null, $created_data = null)
    {
        self::process(self::$CREATED, $target, $description, $old_data, $created_data);
    }

    /**
     * @param $target
     * @param $old_data
     * @param $new_data
     */
    static function update($target, $description = null, $old_data = null, $new_data = null)
    {
        self::process(self::$UPDATED, $target, $description, $old_data, $new_data);
    }

    /**
     * @param $target
     * @param $deleted_data
     */
    static function delete($target, $description = null, $deleted_data = null)
    {
        self::process(self::$DELETED, $target, $description, $deleted_data);
    }

    /**
     * @param $target
     * @param $old_data
     * @param $new_data
     */
    static function change($target, $old_data, $new_data)
    {
        self::process(self::$CHANGED, $target, $old_data, $new_data);
    }

    /**
     * @param $target
     * @param null $description
     */
    static function move($target, $description = null)
    {
        self::process(self::$MOVE, $target, $description);
    }

    /**
     * @param $target
     * @param null $description
     */
    static function upload($target, $description = null)
    {
        self::process(self::$UPLOAD, $target, $description);
    }

    /**
     * @param      $action
     * @param      $old_data
     * @param null $new_data
     */
    private static function process($action, $target, $description = null, $old_data = null, $new_data = null)
    {
        if (is_array($old_data)) {
            $old_data = json_encode($old_data);
        }

        if (is_array($new_data)) {
            $new_data = json_encode($new_data);
        }


        $now = date('Y-m-d H:i:s', time());
//        $browser = get_browser(null, true);
//        $parent = array_get($browser, 'parent', '');
//        $platform = array_get($browser, 'platform', '');
//        $browser = array_get($browser, 'browser', '');

        DB::table('products')->insert([
            'name'      => $action,
            'target'      => "Table: $target",
            'ip'          => $_SERVER['REMOTE_ADDR'],
            'description' => $description,
            // 'browser'     => "Parent: $parent - Platform: $platform - Browser: $browser",

            'old_data'    => $old_data,
            'new_data'    => $new_data,
            'created_at'  => $now,

            'updated_at'  => $now,

        ]);
    }


}