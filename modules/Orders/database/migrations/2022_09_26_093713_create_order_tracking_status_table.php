<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTrackingStatusTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('order_tracking_status', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('title')
                ->comment(
                    '[pending, awaiting payment, awaiting fulfillment, awaiting shipment, awaiting pickup, partially shipped, completed,
                    shipped, cancelled, declined, refunded, disputed, manual verification required, partially refunded.]'
                );
            $table->string('code');
            $table->string('tag_name')->nullable();
            $table->integer('status')->integer();
            $table->longText('description')->nullable()->comment('1–5,000 characters');
            $table->integer('user_created_id');
            $table->integer('user_updated_id')->nullable();
            $table->integer('user_owner_id')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
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
        Schema::dropIfExists('order_tracking_status');
    }
}
