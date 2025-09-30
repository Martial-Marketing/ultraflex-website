<?php

namespace Tests\Feature;

use Tests\TestCase;

class ContactPageTest extends TestCase
{
    /** @test */
    public function contact_page_displays_head_office_and_real_location()
    {
        $response = $this->get('/contact');
        $response->assertStatus(200);
        $response->assertSee('Head Office');
        $response->assertSee('ULTRAFLEX WEST LEEDS');
    }
}
