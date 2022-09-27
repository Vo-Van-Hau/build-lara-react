<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("shipping", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->integer("from_country_id")->unsigned();
            $table->double("cost", 8, 2, true)->unsigned()->comment("Base-Formula: (zone + time + dimensions + weight + others)");
            $table->string("label")->nullable()
                ->comment(
                    "(oversize, perishable, sameday, free shipping) -Use the shipping label [shipping_label] attribute to group products together so that you can configure specific shipping rates in Merchant Center.
                    The information you include in this attribute won’t be shown to customers."
                );
            $table->double("weight", 8, 2, true)->unsigned()->comment("Unit: kg");
            $table->double("width", 8, 2, true)->unsigned()->comment("Unit: cm");
            $table->double("height", 8, 2, true)->unsigned()->comment("Unit: cm");
            $table->double("length", 8, 2, true)->unsigned()->comment("Unit: cm");
            $table->integer("min_handling_time")->unsigned()
                ->comment(
                    "Use minimum handling time [min_handling_time] and maximum handling time [max_handling_time] to help us give users accurate information about how long it will take for a product to arrive at its destination.
                    Maximum and minimum handling time are the longest and shortest amounts of time between when an order is placed and when the product ships."
                );
            $table->integer("max_handling_time")
                ->comment(
                    "Use minimum handling time [min_handling_time] and maximum handling time [max_handling_time] to help us give users accurate information about how long it will take for a product to arrive at its destination.
                    Maximum and minimum handling time are the longest and shortest amounts of time between when an order is placed and when the product ships."
                );
            $table->integer("status")->unsigned();
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
        Schema::dropIfExists("shipping");
    }
}
