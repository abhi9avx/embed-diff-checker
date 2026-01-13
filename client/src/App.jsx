import { useState } from 'react';
import SecurityBanner from './components/SecurityBanner';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import ChartSection from './components/ChartSection';
import VectorVisualizer from './components/VectorVisualizer';
import MathExplanation from './components/MathExplanation';
import VectorDifference from './components/VectorDifference';
import VectorCorrelation from './components/VectorCorrelation';

function App() {
  const [values, setValues] = useState({
    apiKey: '',
    model: 'text-embedding-3-small',
    text1: '',
    text2: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:3000/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to compare texts');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-black/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl drop-shadow-lg">
            Embed-Diff-checker
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            Compare semantic similarity of texts using OpenAI Embeddings.
          </p>
        </div>

        <SecurityBanner />

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <InputSection
            values={values}
            onChange={setValues}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </div>

        {results && (
          <>
            <ResultSection results={results} />
            <ChartSection results={results} />
            <VectorVisualizer results={results} />
            <VectorDifference results={results} />
            <VectorCorrelation results={results} />
            <MathExplanation results={results} />
          </>
        )}

      </div>
    </div>
  );
}

export default App;
