<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Notification;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/testing-notification", function() {
    $user = \Modules\Users\Models\Users::find(6);
    if(!empty($user)) {
        $user->notify(new \App\Notifications\OrderTrackingStatus($user)); // not oke
        echo "Done";
    }
    exit;
});

Route::get("/testing-notification/user", function() {
    $user = \Modules\Users\Models\Users::find(6);
    if(!empty($user)) {
        $notifications = $user->notifications;
        foreach($notifications as $notification) {
            echo $notification->data["name"] . " - " . $notification->data["email"] . "<br/>";
        }

    }
    exit;
});
