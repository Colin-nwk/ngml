<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_advice_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_site_id')->constrained()->cascadeOnDelete();
            $table->foreignId('daily_consumption_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invoice_advice_id')->nullable()->constrained('invoice_advice')->cascadeOnDelete();
            $table->float('volume')->comment('volume in mscf');
            $table->float('inlet_pressure')->nullable()->comment('inlet pressure in psi');
            $table->float('outlet_pressure')->nullable()->comment('outlet pressure in psi');
            $table->string('allocation')->nullable();
            $table->string('nomination')->nullable();
            $table->string('take_or_pay_value')->nullable();
            $table->string('daily_target')->nullable();
            $table->timestamp('original_date');
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_advice_list_items');
    }
};
