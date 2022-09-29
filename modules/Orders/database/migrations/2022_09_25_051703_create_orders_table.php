<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("orders", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->string("code");
            $table->string("receiver_name");
            $table->string("receiver_phone");
            $table->integer("receiver_country_id")->unsigned();
            $table->integer("receiver_province_id")->unsigned();
            $table->integer("receiver_district_id")->unsigned();
            $table->integer("receiver_ward_id")->unsigned();
            $table->text("receiver_address");
            $table->double("subtotal", 8, 2, true)->unsigned()
                ->comment("Subtotal (Shipping and other fees are not included)");
            $table->double("total_amount", 8, 2, true)->unsigned()->comment("Total amount");
            $table->integer("item_quantity")->comment("Number of products in cart");
            $table->float("discount", 8, 2, true)->unsigned()->default(0);
            $table->integer("user_id")->unsigned()->comment("Customer ID");
            $table->integer("shipping_id")->unsigned()->comment("Shipping Detail");
            $table->integer("payment_method_id")->unsigned()->comment("Payment method");
            $table->integer("contact_type_id")->unsigned()->comment("Contact type to contact with customer");
            $table->integer("order_tracking_status_id")->unsigned()->comment("Order Tracking Status");
            $table->integer("shipping_method_id")->unsigned()->comment("Shipping method");
            $table->integer("transporter_id")->unsigned()->nullable()->comment("Transporters");
            $table->dateTime("delivery_date")->nullable();
            $table->integer("status")->unsigned()->default(0)->comment("unpaid -> 0, paid -> 1");
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
        Schema::dropIfExists("orders");
    }
}
