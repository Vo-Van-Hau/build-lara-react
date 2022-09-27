<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductDescriptionDetailTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("product_description_detail", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->integer("product_id")->unsigned();
            $table->string("condition")->comment("[ new, used, refurbished ]");
            $table->string("color")->nullable();
            $table->integer("for_adult")->unsigned()->default(1);
            $table->string("material")->nullable();
            $table->string("age_group")->default("all")
                ->comment(
                    "[ newborn, infant, toddler, kids, adult, all ] -Use the age group [age_group] attribute to set the demographic that your product is designed for.
                     When you use this attribute, your product can appear in results that are filtered by age. For example, results can be filtered by \"Women\" instead of \"Girls\".
                     The age group attribute can also work together with the gender [gender] attribute to help ensure that customers see the correct size information."
                );
            $table->integer("multipack")->nullable()
            ->comment(
                "Use the multipack [multipack] attribute to indicate that you’ve grouped multiple identical products for sale as one product.
                This attribute lets us show your product in the right situations by distinguishing it from manufacturer-created multipacks, bundles, and other products."
            );
            $table->integer("is_bundle")->nullable()->default(0);
            $table->string("size_type")->nullable()->comment("[ regular, petite, maternity, big, tall, plus ]");
            $table->string("size")->nullable()->comment("[ S, M, L, XL, 2XL, 3XL ]");
            $table->string("gender")->nullable()->comment("[ male, female, unisex ]");
            $table->string("size_system")->nullable()->comment("[ US, UK, EU, DE, FR, JS, CN, VN, IT, BR, MEX, AU ]");
            $table->integer("highlight")->nullable()->default(0);
            $table->integer("width")->nullable()->default(NULL)->comment("Unit: cm");
            $table->integer("height")->nullable()->default(NULL)->comment("Unit: cm");
            $table->integer("length")->nullable()->default(NULL)->comment("Unit: cm");
            $table->integer("weight")->nullable()->default(NULL)->comment("Unit: kg");
            $table->string("product_detail")->nullable()->default(NULL)->comment("?(key=value)?(key=value)");
            $table->integer("status")->unsigned()->default(1);
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
        Schema::dropIfExists("product_description_detail");
    }
}
