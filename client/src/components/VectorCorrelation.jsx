import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

export default function VectorCorrelation({ results }) {
    if (!results || !results.embedding1 || !results.embedding2) return null;

    const { embedding1, embedding2 } = results;

    // Prepare data for scatter plot: x = emb1[i], y = emb2[i]
    // We'll use a subset if too large, but 1536 points is manageable for a scatter
    const scatterData = embedding1.map((val1, index) => ({
        x: val1,
        y: embedding2[index]
    }));

    const data = {
        datasets: [
            {
                label: 'embedding Dimensions',
                data: scatterData,
                backgroundColor: (context) => {
                    // Color based on distance from diagonal (error)
                    const point = context.raw;
                    if (!point) return 'rgba(99, 102, 241, 0.5)'; // default indigo
                    const diff = Math.abs(point.x - point.y);
                    // Higher diff = Red, Lower diff = Green/Blue
                    return diff > 0.05 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(99, 102, 241, 0.6)';
                },
                pointRadius: 3,
                pointHoverRadius: 6,
            },
            {
                // Diagonal Reference Line (Perfect Match)
                label: 'Perfect Match (y=x)',
                data: [{ x: -0.1, y: -0.1 }, { x: 0.1, y: 0.1 }], // Approximate range for normalized vectors
                type: 'line',
                borderColor: '#10b981', // Emerald-500 (Bright Green)
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5],
                fill: false
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { family: "'Inter', sans-serif" } }
            },
            title: {
                display: true,
                text: 'Vector Correlation Analysis',
                font: { size: 16, weight: 'bold' },
                color: '#374151'
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const pt = context.raw;
                        const diff = Math.abs(pt.x - pt.y).toFixed(4);
                        return `Text1: ${pt.x.toFixed(4)}, Text2: ${pt.y.toFixed(4)} | Diff: ${diff}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: { display: true, text: 'Text 1 Value', color: '#6366f1' }, // Indigo label
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            y: {
                type: 'linear',
                title: { display: true, text: 'Text 2 Value', color: '#ec4899' }, // Pink label
                grid: { color: 'rgba(0,0,0,0.05)' }
            }
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl mt-6">
            <Scatter options={options} data={data} height={100} />
            <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 mb-2">How to read this graph:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                    <li>
                        <span className="font-semibold text-emerald-600">Green Dashed Line:</span> Represents a <strong>Perfect Match</strong>. Points on this line mean Text 1 & Text 2 are identical for that dimension.
                    </li>
                    <li>
                        <span className="font-semibold text-indigo-500">Blue Points:</span> Close to the line = High Similarity.
                    </li>
                    <li>
                        <span className="font-semibold text-red-500">Red Points:</span> Far from the line = High Divergence (Difference).
                    </li>
                </ul>
            </div>
        </div>
    );
}
