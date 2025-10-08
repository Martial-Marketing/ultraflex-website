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
    // Assert a remaining known plan appears (Day Pass removed from online listing)
    $response->assertSee('Weekly Pass');
    }
}
