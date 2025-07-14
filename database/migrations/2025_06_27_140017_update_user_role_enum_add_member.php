<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the existing enum constraint and recreate with 'member' included
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('user_role');
        });
        
        Schema::table('users', function (Blueprint $table) {
            $table->enum('user_role', ['admin', 'user', 'member'])->default('member')->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to original enum values
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('user_role');
        });
        
        Schema::table('users', function (Blueprint $table) {
            $table->enum('user_role', ['admin', 'user'])->default('user')->after('email');
        });
    }
};
