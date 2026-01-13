# Embed-Diff-checker

A clean, full-stack web application to compare text embeddings using OpenAI's API.
It computes **Cosine Similarity**, **Euclidean Distance**, and visualizes variations in vector space.

## Features

- **Privacy First**: API keys are **never stored**, logged, or persisted. All processing happens in-memory.
- **Server-Side Security**: Supports server-side API key management (`OPENAI_API_KEY`), so clients can use the app without entering a key.
- **Modern UI**: React 18 + Tailwind CSS with a vibrant, glassmorphic aesthetic.
- **Advanced Visualizations**:
    - **3D Vector Fingerprint**: A cylindrical bar chart showing vector dimensions with depth perception.
    - **Vector Correlation Analysis**: A scatter plot visualizing the correlation and correlation divergence between two texts.
    - **Divergence Map**: A line chart highlighting where the two vectors differ most.
- **Educational Insights**: Explains Cosine Similarity math and metrics on-screen.
- **High Accuracy**: Auto-detects identical texts for 100% precision.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite, Chart.js (Scatter, Bar, Line)
- **Backend**: Node.js, Express, OpenAI SDK
- **Security**: Server-side key fallback, input sanitization.

## Prerequisites

- Node.js (v18+)
- An OpenAI API Key

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd embed-diff
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   npm start
   ```
   Server runs on `http://localhost:3000`

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   Client runs on `http://localhost:5173`

4. **Usage**
   - Open the client URL.
   - Enter your OpenAI API Key (it remains local to your session).
   - Enter two texts to compare.
   - Click **Compare Texts**.

## Security Promise

- **No Database**: We do not have a database.
- **No Logging**: We do not log request bodies or API keys.
- **Ephemeral**: Your data exists only during the request lifecycle.

## License

MIT
