import React from "react";
import { mockData } from "../../data/mockData";

export const RecentActivity = () => {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col h-full">
            <h3 className="text-base font-semibold text-white mb-6 flex items-center">
                Recent Activity
                <span className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </h3>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {mockData.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex gap-3">
                        <img
                            alt="User"
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark"
                            src={activity.avatar}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-text-secondary leading-relaxed">
                                <span className="font-medium text-white">
                                    {activity.user}
                                </span>{" "}
                                {activity.action}{" "}
                                <span className="text-white hover:text-primary cursor-pointer transition-colors">
                                    {activity.target}
                                </span>
                            </p>
                            <span className="text-[10px] text-text-secondary/60 mt-0.5 block">
                                {activity.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
