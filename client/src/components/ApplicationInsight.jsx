import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
};

const STAT_CONFIG = [
    { key: "Applied", label: "Applied", bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    { key: "Interview", label: "Interview", bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-100" },
    { key: "Offer", label: "Offer", bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
    { key: "Rejected", label: "Rejected", bg: "bg-red-50", text: "text-red-600", border: "border-red-100" },
];

function ApplicationInsights({ stats = {}, chartData = [], COLORS = [] }) {
    const total = useMemo(() => {
        return (
            (stats.Applied || 0) +
            (stats.Interview || 0) +
            (stats.Offer || 0) +
            (stats.Rejected || 0)
        );
    }, [stats]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative inset-0 backdrop-blur-xl bg-opacity-50 p-8 rounded-3xl shadow-xl mb-10 border border-white/60"
        >
            {/* Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-gray-400/20 to-amber-400/20 blur-2xl rounded-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-10"
            >
                <h3 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-amber-400 to-gray-200  bg-clip-text text-transparent">
                    Application Insights
                </h3>

                <div className="mt-2 h-[3px] w-24 bg-linear-to-r from-gray-400 to-yellow-600 rounded-full shadow-lg" />
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-5">
                    {STAT_CONFIG.map((item, i) => (
                        <motion.div
                            key={item.key}
                            custom={i}
                            variants={cardVariant}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            className={`p-5 rounded-2xl ${item.bg} ${item.border} border shadow-sm cursor-pointer`}
                        >
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <motion.p
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className={`text-3xl font-extrabold ${item.text}`}
                            >
                                {stats[item.key] || 0}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>

                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-white rounded-3xl p-6 shadow-md border"
                >
                    {/* Center Total */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <p className="text-sm text-gray-400">Total</p>
                            <p className="text-3xl font-bold">{total}</p>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={6}
                                animationDuration={1200}
                            >
                                {chartData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default memo(ApplicationInsights);
