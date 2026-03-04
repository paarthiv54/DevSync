import React from 'react';

const StatCard = ({ card }) => {
    return (
        <div className="bg-card-dark p-5 rounded-xl border border-border-dark hover:border-gray-700 transition-colors group">
            <div className="flex items-start justify-between mb-2">
                <div className={`p-2 bg-${card.colorClass}/10 rounded-lg text-${card.colorClass} border border-${card.colorClass}/20`}>
                    <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                </div>
                <span className={`text-[11px] font-medium ${card.trendUp !== null ? (card.trendUp ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20') : 'text-text-secondary bg-surface-dark border-border-dark'} flex items-center px-1.5 py-0.5 rounded border`}>
                    {card.trendUp !== null && <span className="material-symbols-outlined text-[12px] mr-0.5">{card.trendUp ? 'trending_up' : 'trending_down'}</span>}
                    {card.trend}
                </span>
            </div>
            <div className="mt-3">
                <p className="text-text-secondary text-xs font-medium uppercase tracking-wide">{card.title}</p>
                <h4 className="text-2xl font-semibold text-white mt-1">{card.value}</h4>
            </div>
            <div className="w-full h-8 mt-2 flex items-end space-x-1 opacity-50 group-hover:opacity-100 transition-opacity">
                {card.bars.map((barHeight, index) => (
                    <div
                        key={index}
                        className={`w-1/6 rounded-t-sm ${index === card.bars.length - 1 ? `bg-${card.colorClass} shadow-[0_0_10px_${card.colorClass}]` : `bg-${card.colorClass}/20`}`}
                        style={{ height: `${barHeight}%` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default StatCard;
