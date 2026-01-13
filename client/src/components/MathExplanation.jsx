import { Info } from 'lucide-react';

export default function MathExplanation({ results }) {
    if (!results) return null;

    return (
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl mt-8 animate-fade-in-up delay-100">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                    <Info size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 font-sans">Understanding the Math</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formula Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Cosine Similarity Formula</h4>
                    <div className="bg-gray-100 p-4 rounded-xl font-mono text-sm text-center text-gray-800 shadow-inner">
                        <p className="mb-2">similarity = cos(θ) = (A · B) / (||A|| ||B||)</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Where <strong>A</strong> and <strong>B</strong> are the embedding vectors.
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This formula calculates the cosine of the angle between two vectors.
                        It measures orientation rather than magnitude.
                        <br />
                        <span className="inline-block mt-2 font-medium text-indigo-600">
                            Sim = 1.0 → Identical direction (0°)<br />
                            Sim = 0.0 → Orthogonal / Unrelated (90°)
                        </span>
                    </p>
                </div>

                {/* Interpretation Section */}
                <div className="space-y-4 border-l pl-8 border-gray-200">
                    <h4 className="font-semibold text-gray-700">What do the numbers mean?</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start">
                            <span className="w-2 h-2 mt-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                            <span>
                                <strong className="text-gray-900">High Similarity (&gt; 0.8):</strong> The texts share very similar semantic meaning, context, or topic. The vectors point in almost the same direction.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 mt-1.5 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                            <span>
                                <strong className="text-gray-900">Moderate (0.5 - 0.8):</strong> Some shared concepts or overlapping vocabulary, but different nuances or contexts.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 mt-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                            <span>
                                <strong className="text-gray-900">Low Similarity (&lt; 0.5):</strong> The texts are semantically unrelated. In high-dimensional space, random vectors often have near 0 similarity.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
