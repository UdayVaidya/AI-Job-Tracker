import React, { useEffect, useState } from 'react'
import API from '../services/api';

const AIInsightsModal = ({ app, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await API.post("/ai/insights", {
                    role: app.role,
                    notes: app.notes,
                });
                setInsights(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, [app]);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">AI Resume Insights 🤖</h2>

                {loading && <div className="animate-pulse text-gray-500">
                    AI is analysing your profile...
                </div>
                }

                {!loading && insights && (
                    <>
                        <h3 className="font-semibold mt-3">Skills to Highlight</h3>
                        <ul className="list-disc ml-6">
                            {insights.skills.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>

                        <h3 className="font-semibold mt-3">Resume Tips</h3>
                        <ul className="list-disc ml-6">
                            {insights.resumeTips.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 bg-gray-800 text-white px-4 py-1 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default AIInsightsModal