<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'question' => 'required|string|max:1000'
        ]);

        $question = $request->input('question');
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json([
                'error' => 'Gemini API key not configured'
            ], 500);
        }

        try {
            // Add UltraFlex context to make responses more relevant
            $context = "You are an AI assistant for UltraFlex, a gym chain. 
            
UltraFlex Details:
- 24/7 gym access for members
- Multiple locations: West Leeds, North Leeds, Normanton, Rotherham, York, Hull, Durham, Lincoln, West London, Athens
- Offers personal training, group classes, HIIT, strength training, yoga
- Has expert trainers available for bookings
- Provides nutrition plans and workout programs
- Free parking at all locations
- Modern equipment and facilities
- Members can access workout videos, nutrition plans, and book trainers online
- Memberships can be frozen or cancelled by contacting support
- Sign-up available at: https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2

Answer the following question as a helpful UltraFlex assistant: {$question}";

            $response = Http::timeout(30)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={$apiKey}",
                [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $context]
                            ]
                        ]
                    ]
                ]
            );

            if ($response->successful()) {
                $data = $response->json();
                $answer = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Sorry, no answer available.';
                
                return response()->json(['answer' => $answer]);
            }

            Log::error('Gemini API error', ['response' => $response->body()]);
            return response()->json([
                'error' => 'Failed to get response from AI'
            ], 500);

        } catch (\Exception $e) {
            Log::error('Gemini API exception', ['error' => $e->getMessage()]);
            return response()->json([
                'error' => 'AI service temporarily unavailable'
            ], 500);
        }
    }
}