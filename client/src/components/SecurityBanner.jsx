import { ShieldCheck, Lock } from 'lucide-react';

export default function SecurityBanner() {
    return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r shadow-sm">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-blue-700 font-medium">
                        Privacy First: Your API key is <strong>never stored</strong> or logged.
                        All processing happens in-memory.
                    </p>
                </div>
            </div>
        </div>
    );
}
