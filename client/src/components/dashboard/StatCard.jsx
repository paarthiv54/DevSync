import React from "react";

export const StatCard = ({
    title,
    value,
    icon,
    iconContainerClass,
    trend,
    trendIcon,
    trendClass,
    bars,
}) => {
    return (
        <div className="bg-card-dark p-5 rounded-xl border border-border-dark hover:border-gray-700 transition-colors group">
            <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg border ${iconContainerClass}`}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                <span
                    className={`text-[11px] font-medium flex items-center px-1.5 py-0.5 rounded border ${trendClass}`}
                >
                    {trendIcon && (
                        <span className="material-symbols-outlined text-[12px] mr-0.5">
                            {trendIcon}
                        </span>
                    )}
                    {trend}
                </span>
            </div>

            <div className="mt-3">
                <p className="text-text-secondary text-xs font-medium uppercase tracking-wide">
                    {title}
                </p>
                <h4 className="text-2xl font-semibold text-white mt-1">{value}</h4>
            </div>

            <div className="w-full h-8 mt-2 flex items-end space-x-1 opacity-50 group-hover:opacity-100 transition-opacity">
                {bars.map((bar, idx) => (
                    <div
                        key={idx}
                        className={`w-1/6 rounded-t-sm ${bar.color}`}
                        style={{ height: bar.h }}
                    ></div>
                ))}
            </div>
        </div>
    );
};
