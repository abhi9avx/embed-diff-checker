import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function VectorVisualizer({ results }) {
    if (!results || !results.embedding1 || !results.embedding2) return null;

    const { embedding1, embedding2 } = results;

    // Downsample/Bin the embeddings for visualization
    const binnedData = useMemo(() => {
        const binSize = Math.ceil(embedding1.length / 50); // Target ~50 bars
        const binned1 = [];
        const binned2 = [];
        const labels = [];

        for (let i = 0; i < embedding1.length; i += binSize) {
            const chunk1 = embedding1.slice(i, i + binSize);
            const chunk2 = embedding2.slice(i, i + binSize);

            const avg1 = chunk1.reduce((a, b) => a + b, 0) / chunk1.length;
            const avg2 = chunk2.reduce((a, b) => a + b, 0) / chunk2.length;

            binned1.push(avg1);
            binned2.push(avg2);
            labels.push(i);
        }
        return { binned1, binned2, labels };
    }, [embedding1, embedding2]);

    const data = {
        labels: binnedData.labels,
        datasets: [
            {
                label: 'Text 1 Vector',
                data: binnedData.binned1,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.9)'); // Top (Light)
                    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.6)'); // Middle
                    gradient.addColorStop(1, 'rgba(67, 56, 202, 0.9)'); // Bottom (Dark)
                    return gradient;
                },
                borderRadius: 4,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                hoverBackgroundColor: '#818cf8',
            },
            {
                label: 'Text 2 Vector',
                data: binnedData.binned2,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.9)'); // Top
                    gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.6)'); // Middle
                    gradient.addColorStop(1, 'rgba(190, 24, 93, 0.9)'); // Bottom
                    return gradient;
                },
                borderRadius: 4,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                hoverBackgroundColor: '#f472b6',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { family: "'Inter', sans-serif", size: 12 },
                    usePointStyle: true,
                }
            },
            title: {
                display: true,
                text: '3D Vector Fingerprint (Downsampled)',
                font: { family: "'Inter', sans-serif", size: 16, weight: '600' },
                color: '#374151',
                padding: { bottom: 20 }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                display: false, // Hide x labels for cleaner look
                grid: { display: false }
            },
            y: {
                display: false, // Hide y axis
                grid: { display: false }
            },
        },
        interaction: {
            mode: 'index', // Hover over both bars
            intersect: false,
        },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl mt-6">
            <Bar options={options} data={data} height={100} />
            <p className="text-center text-xs text-gray-400 mt-2">
                Visualization of averaged embedding dimensions (50 bins)
            </p>
        </div>
    );
}
