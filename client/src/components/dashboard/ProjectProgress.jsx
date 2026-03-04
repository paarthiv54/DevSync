import React from "react";
import { mockData } from "../../data/mockData";

export const ProjectProgress = () => {
    const data = mockData.progress;
    return (
        <div className="lg:col-span-2 bg-card-dark rounded-xl border border-border-dark p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            {data.title}
                        </h3>
                        <p className="text-xs text-text-secondary mt-1">
                            {data.subtitle}
                        </p>
                    </div>
                    <a
                        className="flex items-center text-xs font-medium text-primary hover:text-blue-400 transition-colors"
                        href="#"
                    >
                        View Detail{" "}
                        <span className="material-symbols-outlined text-[16px] ml-1">
                            chevron_right
                        </span>
                    </a>
                </div>

                <div className="mb-8">
                    <div className="flex items-end space-x-2 mb-2">
                        <span className="text-5xl font-bold text-white tracking-tight">
                            {data.percentage}%
                        </span>
                        <span className="text-sm font-medium text-text-secondary mb-1.5">
                            Complete
                        </span>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]`}
                            style={{ width: `${data.percentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center space-x-6 border-t border-border-dark pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-text-secondary">Completed</span>
                        <span className="text-sm font-medium text-white">
                            {data.completedTasks} Tasks
                        </span>
                    </div>
                    <div className="w-[1px] h-8 bg-border-dark"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-text-secondary">Total</span>
                        <span className="text-sm font-medium text-white">
                            {data.totalTasks} Tasks
                        </span>
                    </div>
                    <div className="w-[1px] h-8 bg-border-dark"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-text-secondary">Next Due</span>
                        <span className="text-sm font-medium text-white">
                            {data.nextDue}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
