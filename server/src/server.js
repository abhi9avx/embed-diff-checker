const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Limit body size to avoid abuse
app.use(express.json({ limit: '10kb' }));
app.use(cors());

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Embed Diff Checker API is running. use POST /compare to access the API.');
});

// Pure math utility for cosine similarity
function calculateCosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
}

app.post('/compare', async (req, res) => {
    try {
        let { apiKey, model, text1, text2 } = req.body;

        // Security: Use server-side key if client doesn't provide one
        if (!apiKey) {
            apiKey = process.env.OPENAI_API_KEY;
        }

        // Validation
        if (!apiKey || !text1 || !text2) {
            return res.status(400).json({ error: 'Missing required fields (API Key or Texts)' });
        }

        // accuracy: Optimize and sanity check for exact matches
        // Trim inputs to avoid " " vs "" issues
        const cleanText1 = text1.trim();
        const cleanText2 = text2.trim();

        if (cleanText1 === cleanText2) {
            // Mock response for identical text to save API cost and ensure 100% match
            // We still need embeddings for visualization though... 
            // If we want perfect 1.0, we can still call API but force similarity to 1.
        }

        const openai = new OpenAI({ apiKey });
        const requestModel = model || 'text-embedding-3-small';

        // Call OpenAI API
        const response = await openai.embeddings.create({
            model: requestModel,
            input: [cleanText1, cleanText2],
        });

        const embedding1 = response.data[0].embedding;
        const embedding2 = response.data[1].embedding;

        // Compute metrics
        let similarity = calculateCosineSimilarity(embedding1, embedding2);

        // Mathematical stability check
        if (cleanText1 === cleanText2) {
            similarity = 1.0;
        }

        const distance = 1 - similarity;
        // Clamp similarity to -1, 1 for acos stability
        const clampedSim = Math.max(-1, Math.min(1, similarity));
        const angle = Math.acos(clampedSim) * (180 / Math.PI);

        res.json({
            similarity: parseFloat(similarity.toFixed(4)),
            distance: parseFloat(distance.toFixed(4)),
            angle: parseFloat(angle.toFixed(2)),
            embedding1,
            embedding2
        });

    } catch (error) {
        // Security: STRIP API KEY from error
        const cleanError = {
            message: error.message || 'An error occurred',
            type: error.type || 'unknown'
        };
        console.error('API Error:', cleanError.message);
        res.status(500).json({ error: cleanError.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
