<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("products", function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->integer("seller_id")->unsigned()->default(0);
            $table->string("name");
            $table->string("slug_name")->nullable();
            $table->double("price", 8, 2, true)->unsigned()
                ->comment("Use the price [price] attribute to tell users how much you’re charging for your product. This information is shown to users.");
            $table->integer("sale_price_id")->unsigned()->default(0)
                ->comment(
                    "Use the sale price [sale_price] attribute to tell customers how much you're charging for your product during a sale.
                    During a sale, your sale price will be shown as the current price.
                    If your original price and sale price meet certain requirements, your original price may show along with the sale price,
                    allowing people to see the difference between the two."
                );
            $table->double("cogs", 8, 2)->unsigned()->nullable()->comment("Cost of goods sold");
            $table->text("link")->nullable()
                ->comment(
                    "When users click on your product, they’re sent to a landing page on your website for that product.
                    Set the URL for this landing page with the link [link] attribute."
                );
            $table->text("mobile_link")->nullable()
                ->comment(
                    "The mobile link [mobile_link] attribute lets you include a URL to a mobile-optimized version of your landing page.
                    This mobile version will be shown to users on mobile devices, like phones or tablets.
                    When using this attribute, you’ll also see additional reporting in Merchant Center for potential issues with your mobile-optimized landing pages."
                );
            $table->text("image_link")->nullable()
                ->comment(
                    "When users click on your product, they’re sent to a landing page on your website for that product.
                    Set the URL for this landing page with the link [link] attribute."
                );
            $table->text("additional_image_link")->nullable()
                ->comment("Pattern -> [item|item|item]");
            $table->integer("category_id")->unsigned()->default(0);
            $table->integer("currency_id")->unsigned()->default(0);
            $table->string("availability")->default("in_stock")->comment("[in_stock, out_of_stock, preorder, backorder]");
            $table->dateTime("availability_date")->nullable()
                ->comment("Use the availability date [availability_date] attribute to tell customers when a preordered or backordered product will be shipped.");
            $table->dateTime("expiration_date")->nullable()
                ->comment(
                    "Use the expiration date [expiration_date] attribute to cause a product to stop showing on a specific date.
                    For example, you might want to do this for limited stock or seasonal products."
                );
            $table->integer("status")->unsigned()->default(0)->comment("draft -> 0, published -> 1 (development, production)");
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
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
