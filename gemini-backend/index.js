import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve project root relative to this file so we can load the root .env and docs reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Load env from project root .env
dotenv.config({ path: path.resolve(PROJECT_ROOT, '.env') });

const app = express();
const PORT = process.env.PORT || 4001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

// Load chatbot knowledge base (plain Markdown) from project root
const KB_PATH = path.resolve(PROJECT_ROOT, 'docs', 'CHATBOT_KB.md');
let KB_TEXT = '';
try {
  KB_TEXT = fs.readFileSync(KB_PATH, 'utf-8');
  console.log(`[chatbot] Loaded KB from ${KB_PATH} (${KB_TEXT.length} bytes)`);
} catch (e) {
  console.warn('[chatbot] KB not found, proceeding with default context');
}

app.post('/api/gemini', async (req, res) => {
  const { question, context: clientCtx } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }
  try {
    // Compose scoped system instructions + KB + user question
    const instructions = `You are ULTRAFLEX Gym website assistant. Only answer questions about ULTRAFLEX gyms, memberships, facilities, locations, opening times, trainers, and site content. If the question is unrelated, politely refuse.`;
    const baseFacts = `Key facts:\n- Gyms offer 24/7 access for qualifying members; staffed hours vary by site.\n- Locations include West Leeds, North Leeds, Normanton, Rotherham, York, Hull, Durham, Lincoln, West London, Athens.\n- Sign up and pricing via Ashbourne: https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2\n- Contact: info@ultraflexgym.co.uk`;
    const kbSection = KB_TEXT ? `\n\nKnowledge Base:\n${KB_TEXT}` : '';
    const pageHint = clientCtx?.locationSlug
      ? `\n\nUser is currently viewing the location page: ${clientCtx.locationSlug}. Prefer details for this site. If unsure, provide safe general guidance and link to /locations/${clientCtx.locationSlug} and the Ashbourne portal for pricing.`
      : clientCtx?.currentPath
        ? `\n\nCurrent page path: ${clientCtx.currentPath}. Tailor the answer to this page context where relevant.`
        : '';
    const context = `${instructions}\n\n${baseFacts}${kbSection}${pageHint}\n\nAnswer format:\n- Start with a concise sentence.\n- Use short bullet points when listing info.\n- Include relevant links (Ashbourne, location pages, tours) when helpful.\n- If you aren't certain, say so and suggest contacting info@ultraflexgym.co.uk.\n\nUser question: ${question}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: context }] }]
      }
    );
    const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I don’t have that yet. Please contact our staff for more info!';
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
