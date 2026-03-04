import React from "react";
import { mockData } from "../../data/mockData";

export const TeamMembers = () => {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-white">Team Members</h3>
                <button className="text-text-secondary hover:text-white transition p-1 hover:bg-surface-dark rounded-md">
                    <span className="material-symbols-outlined text-lg">add</span>
                </button>
            </div>

            <div className="space-y-1 flex-1">
                {mockData.teamMembers.map((member, idx) => (
                    <div
                        key={idx}
                        className="p-2.5 rounded-lg hover:bg-surface-dark transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-border-dark"
                    >
                        <div className="flex items-center space-x-3">
                            <img
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark"
                                src={member.avatar}
                            />
                            <div>
                                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white leading-tight">
                                    {member.name}
                                </h4>
                                <p className="text-[11px] text-text-secondary">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-mono font-medium text-text-secondary group-hover:text-primary transition-colors">
                                {member.tasks} Tasks
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 rounded-lg border border-border-dark text-xs font-medium text-text-secondary hover:text-white hover:bg-surface-dark transition-all duration-200">
                Manage Team
            </button>
        </div>
    );
};
