import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }
  try {
    // Add UltraFlex context to make responses more relevant
    const context = `You are an AI assistant for UltraFlex, a premium fitness gym chain. 
    
UltraFlex Details:
- 24/7 gym access for members
- Multiple locations: West Leeds, North Leeds, Normanton, Rotherham, York, Hull, Durham, Lincoln, West London, Athens
- Offers personal training, group classes, HIIT, strength training, yoga
- Has expert trainers available for bookings
- Provides nutrition plans and workout programs
- Free parking at all locations
- Premium equipment and facilities
- Members can access workout videos, nutrition plans, and book trainers online
- Memberships can be frozen or cancelled by contacting support
- Sign-up available at: https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2

Answer the following question as a helpful UltraFlex assistant: ${question}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: context }] }]
      }
    );
    const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no answer available.';
    res.json({ answer });
  } catch (error) {
    // Log full Gemini API error for debugging
    console.error('Gemini API error:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to fetch from Gemini API', details: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini backend running on port ${PORT}`);
});
