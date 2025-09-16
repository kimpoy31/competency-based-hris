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
        Schema::create('behavioral_indicators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proficiency_level_id')->constrained()->onDelete('cascade');
            $table->foreignId('competency_id')->constrained()->onDelete('cascade');
            $table->text('definition');
            $table->integer('order');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('behavioral_indicators');
    }
};
