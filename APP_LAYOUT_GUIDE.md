# ULTRAFLEX App Layout Guide

## Overview

The `app-layout.tsx` has been updated to provide a consistent layout structure with navbar and footer for all pages in the ULTRAFLEX application.

## Features

- ✅ **Automatic Navbar**: Shows navigation with authentication state
- ✅ **Automatic Footer**: Displays footer content on every page
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Authentication Aware**: Passes user state to navbar
- ✅ **Flexible Content Area**: Main content area adjusts automatically

## How to Use

### Basic Usage

```tsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    user: User | null;
}

interface MyPageProps {
    auth: AuthProps;
    // ... other props
}

export default function MyPage({ auth, ...otherProps }: MyPageProps) {
    return (
        <AppLayout auth={auth}>
            <Head title="My Page - ULTRAFLEX">
                <meta name="description" content="My page description" />
            </Head>

            <div className="container mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-8">My Page</h1>
                {/* Your page content here */}
            </div>
        </AppLayout>
    );
}
```

### Controller Setup

In your Laravel controller, make sure to pass the `auth` object:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MyController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('MyPage', [
            'auth' => [
                'user' => $request->user()
            ],
            // ... other data
        ]);
    }
}
```

### Route Examples

```php
// Simple route with auth
Route::get('/my-page', function (Request $request) {
    return inertia('MyPage', [
        'auth' => [
            'user' => $request->user()
        ]
    ]);
});

// Controller route
Route::get('/my-page', [MyController::class, 'index']);
```

## Example Pages

We've created two example pages to demonstrate the layout:

1. **Basic Example**: `/example-with-layout`
   - Simple page showing layout usage
   - Authentication state display
   - Basic content structure

2. **Complex Example**: `/example-contact-with-layout` 
   - Contact form with layout
   - Shows how to handle forms within the layout
   - Demonstrates content with animated background

## Layout Structure

```
┌─────────────────────────────────┐
│           Navbar                │
├─────────────────────────────────┤
│                                 │
│         Main Content            │
│       (Your Page Here)          │
│                                 │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

## Benefits

1. **Consistency**: All pages have the same navigation structure
2. **Maintainability**: Update navbar/footer in one place
3. **User Experience**: Familiar navigation on every page
4. **Authentication**: Login/logout status automatically handled
5. **Responsive**: Works on all device sizes

## Migration Guide

To convert existing pages to use the layout:

1. Import `AppLayout` component
2. Wrap your page content with `<AppLayout auth={auth}>`
3. Remove any existing navbar/footer imports from the page
4. Ensure your controller passes the `auth` object
5. Update your TypeScript interfaces to include `auth` prop

## Testing

Visit the example pages to see the layout in action:

- `/example-with-layout` - Basic layout example
- `/example-contact-with-layout` - Contact form with layout

The navbar will show different options based on authentication state:
- **Not logged in**: Login/Register buttons
- **Logged in**: User menu with profile/logout options
