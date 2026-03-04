import React from "react";
import { mockData } from "../../data/mockData";

export const UpcomingTasks = () => {
    return (
        <div className="xl:col-span-2 bg-card-dark rounded-xl border border-border-dark flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border-dark flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Upcoming Tasks</h3>
                <button className="p-1 text-text-secondary hover:text-white transition rounded">
                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-dark/50 border-b border-border-dark">
                            <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider">
                                Task
                            </th>
                            <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider">
                                Due Date
                            </th>
                            <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider">
                                Assigned
                            </th>
                            <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider text-right">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-dark/50 text-sm">
                        {mockData.upcomingTasks.map((task, idx) => (
                            <tr
                                key={idx}
                                className="group hover:bg-surface-dark transition-colors duration-200"
                            >
                                <td className="py-3 px-5">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full ${task.colorClass} ${task.shadowClass}`}
                                        ></div>
                                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                                            {task.title}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-5 text-text-secondary font-mono text-xs">
                                    {task.dueDate}
                                </td>
                                <td className="py-3 px-5">
                                    <div className="flex -space-x-2">
                                        {task.assignees.map((avatar, bidx) => (
                                            <img
                                                key={bidx}
                                                alt="User"
                                                className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black object-cover"
                                                src={avatar}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td className="py-3 px-5 text-right">
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-medium border ${task.statusClass}`}
                                    >
                                        {task.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
