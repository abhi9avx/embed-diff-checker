# Embed-Diff-checker Server

The backend for the Embed-Diff-checker application, built with Node.js and Express.
It handles OpenAI API communication to ensure security and CORS compliance.

## Features

- **Secure API Key Handling**:
    - Accepts API key from client request header/body.
    - **Fallback**: Uses server-side `OPENAI_API_KEY` environmental variable if no key is provided by the client.
    - Keys are **never logged** or stored.
- **Input Sanitization**: Trims whitespace and validates inputs.
- **Exact Match Logic**: Automatically detects identical texts to return 1.0 similarity without wasting API calls.
- **Error Masking**: Sanitizes error messages to prevent leaking sensitive info to the client.

## API Endpoints

### `POST /compare`

Compares two text strings and returns similarity metrics.

**Request Body:**
```json
{
  "apiKey": "sk-...", // Optional
  "model": "text-embedding-3-small",
  "text1": "Hello world",
  "text2": "Hello there"
}
```

**Response:**
```json
{
  "similarity": 0.88,
  "distance": 0.45,
  "angle": 28.5,
  "embedding1": [...],
  "embedding2": [...]
}
```

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure Environment**
    Create a `.env` file:
    ```env
    OPENAI_API_KEY=your_server_key_here
    PORT=3000
    ```

3.  **Start Server**
    ```bash
    npm start
    ```
    Runs on `http://localhost:3000`
