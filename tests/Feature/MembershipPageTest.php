<?php

namespace Tests\Feature;

use Tests\TestCase;

class MembershipPageTest extends TestCase
{
    /** @test */
    public function membership_page_loads_and_contains_expected_plan()
    {
        $response = $this->get('/membership');
        $response->assertStatus(200);
        // Inertia props assertion: ensure a known plan appears (e.g., 'Day Pass')
        $response->assertSee('Day Pass');
    }
}
