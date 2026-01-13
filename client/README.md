# Embed-Diff-checker Client

The frontend for the Embed-Diff-checker application, built with React, Vite, and Tailwind CSS.

## Features

- **Component-Based Architecture**: Modular components for different visualizations.
- **Glassmorphism UI**: Modern aesthetic using backdrop blur and semi-transparent layers.
- **Interactive Visualizations**:
    - **Vector Correlation**: Scatter plot showing dimension-wise correlation.
    - **Vector Fingerprint**: 3D-styled bar chart of embedding vectors.
    - **Vector Difference**: Line chart highlighting divergence.
- **Educational Modules**: Explains the math behind Cosine Similarity.

## Project Structure

```
src/
├── components/
│   ├── InputSection.jsx       // API Key & Text inputs
│   ├── ResultSection.jsx      // Similarity scores & metrics
│   ├── ChartSection.jsx       // Radar chart
│   ├── VectorVisualizer.jsx   // 3D Bar chart
│   ├── VectorDifference.jsx   // Divergence line chart
│   ├── VectorCorrelation.jsx  // Scatter plot
│   └── MathExplanation.jsx    // Educational content
├── App.jsx                    // Main layout
└── index.css                  // Tailwind & custom styles
```

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```
    Runs on `http://localhost:5173`
