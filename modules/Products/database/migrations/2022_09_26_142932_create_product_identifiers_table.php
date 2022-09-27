<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductIdentifiersTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("product_identifiers", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->string("brand");
            $table->integer("product_id")->unsigned()->comment("Product ID");
            $table->integer("supplier_id")->unsigned()->comment("Supplier");
            $table->string("sku")->comment("Stock Keeping Unit")->nullable();
            $table->string("gtin")
                ->comment(
                    "Use the GTIN [gtin] attribute to submit Global Trade Item Numbers (GTINs).
                    A GTIN uniquely identifies your product. This specific number helps us make your ad or unpaid listing richer and easier for your customers to find.
                    Products submitted without any unique product identifiers are difficult to classify and may not be eligible for all Shopping programs or features."
                )->nullable();
            $table->string("mpn")
                ->comment(
                    "Use the MPN [mpn] attribute to submit your product’s Manufacturer Part Number (MPN).
                    MPNs are used to uniquely identify a specific product among all products from the same manufacturer.
                    Shoppers might search specifically for an MPN, so providing the MPN can help ensure that your product is shown in relevant situations."
                )->nullable();
            $table->integer("status")->unsigned()->default(1)->comment("0: No, 1: Yes");
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
        Schema::dropIfExists("product_identifiers");
    }
}
