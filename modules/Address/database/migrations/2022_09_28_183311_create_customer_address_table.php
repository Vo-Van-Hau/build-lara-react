<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerAddressTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("customer_address", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->integer("customer_id")->unsigned();
            $table->string("customer_name");
            $table->string("company_name")->nullable();
            $table->string("phone");
            $table->integer("area_id")->unsigned();
            $table->integer("country_id")->unsigned()->default(0);
            $table->integer("province_id")->unsigned()->default(0);
            $table->integer("district_id")->unsigned()->default(0);
            $table->integer("ward_id")->unsigned()->default(0);
            $table->text("address")->nullable();
            $table->string("delivery_address_type")->default("house")->comment("[ house, company ]");
            $table->integer("is_default")->default(1);
            $table->integer("status")->unsigned()->default(0);
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
        Schema::dropIfExists("customer_address");
    }
}
