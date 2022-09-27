<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDetailTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("order_detail", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->integer("order_id")->unsigned();
            $table->integer("product_id")->unsigned();
            $table->string("product_name");
            $table->text("product_image_link");
            $table->integer("quantity")->unsigned();
            $table->double("price", 8, 2, true)->unsigned();
            $table->text("note")->nullable();
            $table->longText("description")->nullable()->comment("1–5,000 characters");
            $table->integer("user_created_id");
            $table->integer("user_updated_id")->nullable();
            $table->integer("user_owner_id")->nullable();
            $table->dateTime("created_at")->nullable();
            $table->dateTime("updated_at")->nullable();
            $table->integer("deleted")->default(0);
            $table->dateTime("deleted_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists("order_detail");
    }
}
