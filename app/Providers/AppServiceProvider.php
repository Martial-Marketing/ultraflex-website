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
        // ...existing code...

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
