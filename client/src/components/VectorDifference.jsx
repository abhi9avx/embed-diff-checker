import { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function VectorDifference({ results }) {
    if (!results || !results.embedding1 || !results.embedding2) return null;

    const { embedding1, embedding2 } = results;

    const differenceData = useMemo(() => {
        // Bin size for smoother visualization, plotting all 1536 points is too noisy/heavy
        const binSize = 10;
        const labels = [];
        const diffs = [];

        for (let i = 0; i < embedding1.length; i += binSize) {
            let sumDiff = 0;
            for (let j = 0; j < binSize && (i + j) < embedding1.length; j++) {
                // Calculate absolute difference per dimension
                sumDiff += Math.abs(embedding1[i + j] - embedding2[i + j]);
            }
            // Average diff for this bin
            diffs.push(sumDiff / binSize);
            labels.push(i);
        }
        return { labels, diffs };
    }, [embedding1, embedding2]);

    const data = {
        labels: differenceData.labels,
        datasets: [
            {
                label: 'Vector Divergence (Element-wise Difference)',
                data: differenceData.diffs,
                borderColor: 'rgba(239, 68, 68, 0.8)', // Red
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                pointRadius: 0, // clean line
                fill: true,
                tension: 0.4, // smooth curves
            },
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
                text: 'Semantic Divergence Map',
                font: { size: 16, weight: 'bold' },
                color: '#374151'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                display: false,
                title: { display: true, text: 'Embedding Dimensions (0-1536)' }
            },
            y: {
                display: true,
                title: { display: true, text: 'Magnitude of Difference' },
                suggestedMin: 0,
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl mt-6">
            <Line options={options} data={data} height={80} />
            <p className="text-center text-xs text-gray-500 mt-4 italic">
                Peaks indicate dimensions (features) where the two texts differ most significantly.
            </p>
        </div>
    );
}
