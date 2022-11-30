<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateOrderTrackingDetailsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('order_tracking_details', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('code');
            $table->integer('order_id')->unsigned();
            $table->integer('order_tracking_status_id')->unsigned()->default(1);
            $table->timestamp('tracking_at')->useCurrent();
            $table->longText('description')->nullable()->comment('1–5,000 characters');
            $table->integer('user_created_id');
            $table->integer('user_updated_id')->nullable();
            $table->integer('user_owner_id')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->integer('deleted')->default(0);
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('order_tracking_details');
    }
}
