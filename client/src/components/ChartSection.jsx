import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function ChartSection({ results }) {
    if (!results) return null;

    // Normalize angle for chart (0-90 -> 0-1) inverse? 
    // Actually, let's just plot Similarity, Distance, and maybe create a composite score?
    // Let's do a 3-axis radar: Similarity, Distance, and Coherence (1 - Angle/90)

    // Normalized Metrics
    const similarity = results.similarity; // 0-1 usually
    const distance = results.distance; // 0-1 usually
    const coherence = Math.max(0, 1 - (results.angle / 90)); // 0-1, closest 1

    const data = {
        labels: ['Semantic Match', 'Distance', 'Angular Coherence'],
        datasets: [
            {
                label: 'Comparison Metrics',
                data: [similarity, distance, coherence],
                backgroundColor: 'rgba(99, 102, 241, 0.2)', // Indigo
                borderColor: '#6366f1',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#6366f1',
                pointHoverBackgroundColor: '#6366f1',
                pointHoverBorderColor: '#fff',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw.toFixed(4)}`
                }
            }
        },
        scales: {
            r: {
                angleLines: { color: 'rgba(0, 0, 0, 0.05)' },
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                pointLabels: {
                    font: { family: "'Inter', sans-serif", size: 12, weight: '600' },
                    color: '#4b5563'
                },
                ticks: { display: false, backdropColor: 'transparent' },
                suggestedMin: 0,
                suggestedMax: 1,
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeOutElastic'
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl mt-6 flex flex-col items-center">
            <h3 className="text-gray-800 font-semibold mb-4 font-sans">Metric Radar</h3>
            <div className="w-full max-w-sm">
                <Radar data={data} options={options} />
            </div>
        </div>
    );
}
