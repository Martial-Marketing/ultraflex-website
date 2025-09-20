<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (! app()->runningUnitTests()) {
            // Enforce the intended database connection (pgsql) at runtime.
            // This guards against host-level env vars (e.g., DB_CONNECTION=mysql) overriding .env
            // which caused web requests to use MySQL while CLI used Postgres.
            if (config('database.default') !== 'pgsql') {
                config(['database.default' => 'pgsql']);
            }

            // Pin pgsql connection credentials to avoid OS-level env overrides (e.g., DB_PORT=3306)
            // Use the intended values from your .env.
            config([
                'database.connections.pgsql.host' => '127.0.0.1',
                'database.connections.pgsql.port' => '5432',
                'database.connections.pgsql.database' => 'UFbacker',
                'database.connections.pgsql.username' => 'postgres',
                'database.connections.pgsql.password' => '1234',
            ]);

            try {
                // Reset and reconnect to ensure the new connection settings are active
                DB::purge();
                DB::reconnect('pgsql');
            } catch (\Throwable $e) {
                // Silently ignore; validation will surface a clear DB error if it still fails
            }
        }

        // Ensure the validation presence verifier uses the pgsql connection for unique/existence rules
        if (! app()->runningUnitTests()) {
            try {
                $presence = App::make('validation.presence');
                if (method_exists($presence, 'setConnection')) {
                    $presence->setConnection('pgsql');
                }
            } catch (\Throwable $e) {
                // Ignore - will fallback to default connection
            }
        }
    }
}
