import { Lock } from 'lucide-react';

export default function InputSection({ values, onChange, onSubmit, loading, error }) {
    const { apiKey, model, text1, text2 } = values;

    // Allow empty apiKey if user wants to use server env variable
    const isFormValid = text1 && text2;

    const handleChange = (field, value) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* API Key */}
                <div>
                    <label className="block text-base font-extrabold text-gray-900 mb-2">
                        OpenAI API Key
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => handleChange('apiKey', e.target.value)}
                            className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-lg font-semibold p-3 border text-gray-900 placeholder-gray-400"
                        />
                    </div>
                    <p className="mt-2 text-sm text-green-600 font-bold">
                        Secure server processing. Key never stored.
                    </p>
                </div>

                {/* Model Selector */}
                <div>
                    <label className="block text-base font-extrabold text-gray-900 mb-2">
                        Model
                    </label>
                    <select
                        value={model}
                        onChange={(e) => handleChange('model', e.target.value)}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-lg font-semibold p-3 border text-gray-900"
                    >
                        <option value="text-embedding-3-small">text-embedding-3-small</option>
                        <option value="text-embedding-3-large">text-embedding-3-large</option>
                        <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Text 1 */}
                <div>
                    <label className="block text-base font-extrabold text-gray-900 mb-2">
                        Text 1
                    </label>
                    <textarea
                        rows={4}
                        value={text1}
                        onChange={(e) => handleChange('text1', e.target.value)}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-lg font-semibold p-3 border text-gray-900 placeholder-gray-400"
                        placeholder="Enter first text..."
                    />
                </div>

                {/* Text 2 */}
                <div>
                    <label className="block text-base font-extrabold text-gray-900 mb-2">
                        Text 2
                    </label>
                    <textarea
                        rows={4}
                        value={text2}
                        onChange={(e) => handleChange('text2', e.target.value)}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-lg font-semibold p-3 border text-gray-900 placeholder-gray-400"
                        placeholder="Enter second text..."
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => onChange({ apiKey: '', model: 'text-embedding-3-small', text1: '', text2: '' })}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                >
                    Clear All
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!isFormValid || loading}
                    className={`px-6 py-2 border border-transparent text-sm font-bold rounded-lg shadow-md text-white transition-all transform hover:scale-105
            ${!isFormValid || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Comparing...
                        </span>
                    ) : 'Compare Texts'}
                </button>
            </div>
        </div>
    );
}
