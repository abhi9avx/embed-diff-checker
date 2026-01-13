import clsx from 'clsx';
import { CheckCircle, AlertTriangle, XCircle, Zap, Activity, Compass } from 'lucide-react';

export default function ResultSection({ results }) {
    if (!results) return null;

    const { similarity, distance, angle } = results;

    let conclusion = '';
    let theme = '';
    let Icon = null;

    if (similarity > 0.8) {
        conclusion = 'Highly Semantic Match';
        theme = 'from-green-500 to-emerald-600 shadow-emerald-200';
        Icon = CheckCircle;
    } else if (similarity > 0.6) {
        conclusion = 'Moderate Correlation';
        theme = 'from-yellow-400 to-amber-500 shadow-amber-200';
        Icon = AlertTriangle;
    } else {
        conclusion = 'Distinct Contexts';
        theme = 'from-red-500 to-rose-600 shadow-rose-200';
        Icon = XCircle;
    }

    const StatCard = ({ label, value, sub, icon: StatIcon, delay }) => (
        <div className="relative group perspective" style={{ animationDelay: `${delay}ms` }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1">
                <div className="p-3 bg-indigo-50 rounded-full mb-3 text-indigo-600">
                    <StatIcon size={24} />
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 font-sans">
                    {value}
                </p>
                {sub && <p className="text-xs text-gray-400 mt-2 font-medium">{sub}</p>}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Conclusion Header */}
            <div className={clsx(
                "relative overflow-hidden rounded-2xl shadow-lg p-8 text-center text-white bg-gradient-to-br transform transition-all hover:scale-[1.01]",
                theme
            )}>
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 blur-3xl -ml-20"></div>

                <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                    <Icon className="w-12 h-12 mb-2 drop-shadow-md" />
                    <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-sm font-sans">{conclusion}</h2>
                    <p className="text-white/80 font-medium">Based on cosine similarity analysis</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Similarity"
                    value={similarity.toFixed(4)}
                    sub="Cosine Score"
                    icon={Zap}
                    delay={100}
                />
                <StatCard
                    label="Distance"
                    value={distance.toFixed(4)}
                    sub="1 - Similarity"
                    icon={Activity}
                    delay={200}
                />
                <StatCard
                    label="Angle"
                    value={`${angle}°`}
                    sub="angular separation"
                    icon={Compass}
                    delay={300}
                />
            </div>
        </div>
    );
}
