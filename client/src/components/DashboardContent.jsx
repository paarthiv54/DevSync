import React from 'react';
import StatCard from './StatCard';
import { statCards, recentActivity, upcomingTasks, teamMembers } from '../data/mockData';

const DashboardContent = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 pb-12 custom-scrollbar">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map(card => (
                    <StatCard key={card.id} card={card} />
                ))}
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Project Progress */}
                <div className="lg:col-span-2 bg-card-dark rounded-xl border border-border-dark p-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-base font-semibold text-white">Project Progress</h3>
                                <p className="text-xs text-text-secondary mt-1">Tracking completion across active sprints</p>
                            </div>
                            <a className="flex items-center text-xs font-medium text-primary hover:text-blue-400 transition-colors" href="#">
                                View Detail <span className="material-symbols-outlined text-[16px] ml-1">chevron_right</span>
                            </a>
                        </div>
                        <div className="mb-8">
                            <div className="flex items-end space-x-2 mb-2">
                                <span className="text-5xl font-bold text-white tracking-tight">65%</span>
                                <span className="text-sm font-medium text-text-secondary mb-1.5">Complete</span>
                            </div>
                            <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6 border-t border-border-dark pt-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary">Completed</span>
                                <span className="text-sm font-medium text-white">12 Tasks</span>
                            </div>
                            <div className="w-[1px] h-8 bg-border-dark"></div>
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary">Total</span>
                                <span className="text-sm font-medium text-white">24 Tasks</span>
                            </div>
                            <div className="w-[1px] h-8 bg-border-dark"></div>
                            <div className="flex flex-col">
                                <span className="text-xs text-text-secondary">Next Due</span>
                                <span className="text-sm font-medium text-white">Jun 12</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col h-full">
                    <h3 className="text-base font-semibold text-white mb-6 flex items-center">
                        Recent Activity
                        <span className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    </h3>
                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {recentActivity.map(activity => (
                            <div key={activity.id} className="flex gap-3">
                                <img alt="User" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src={activity.avatar} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        <span className="font-medium text-white">{activity.user}</span> {activity.action} <span className="text-white hover:text-primary cursor-pointer transition-colors">{activity.target}</span>
                                    </p>
                                    <span className="text-[10px] text-text-secondary/60 mt-0.5 block">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Upcoming Tasks */}
                <div className="xl:col-span-2 bg-card-dark rounded-xl border border-border-dark flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-border-dark flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">Upcoming Tasks</h3>
                        <button className="p-1 text-text-secondary hover:text-white transition rounded"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-dark/50 border-b border-border-dark">
                                    <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider">Task</th>
                                    <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider">Due Date</th>
                                    <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider">Assigned</th>
                                    <th className="py-3 px-5 text-[11px] font-medium text-text-secondary uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark/50 text-sm">
                                {upcomingTasks.map(task => (
                                    <tr key={task.id} className="group hover:bg-surface-dark transition-colors duration-200">
                                        <td className="py-3 px-5">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${task.dotColor}`} style={{ boxShadow: `0 0 8px ${task.dotShadow}` }}></div>
                                                <span className="font-medium text-gray-200 group-hover:text-white transition-colors">{task.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-5 text-text-secondary font-mono text-xs">{task.dueDate}</td>
                                        <td className="py-3 px-5">
                                            <div className="flex -space-x-2">
                                                {task.assignees.map((assignee, idx) => (
                                                    <img key={idx} alt="Avatar" className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black" src={assignee} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-5 text-right">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-${task.statusColor}-500/10 text-${task.statusColor}-400 border border-${task.statusColor}-500/20`}>
                                                {task.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Team Members */}
                <div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-semibold text-white">Team Members</h3>
                        <button className="text-text-secondary hover:text-white transition p-1 hover:bg-surface-dark rounded-md"><span className="material-symbols-outlined text-lg">add</span></button>
                    </div>
                    <div className="space-y-1 flex-1">
                        {teamMembers.map(member => (
                            <div key={member.id} className="p-2.5 rounded-lg hover:bg-surface-dark transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-border-dark">
                                <div className="flex items-center space-x-3">
                                    <img alt={member.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src={member.avatar} />
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-white leading-tight">{member.name}</h4>
                                        <p className="text-[11px] text-text-secondary">{member.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-mono font-medium text-text-secondary group-hover:text-primary transition-colors">{member.tasks} Tasks</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 rounded-lg border border-border-dark text-xs font-medium text-text-secondary hover:text-white hover:bg-surface-dark transition-all duration-200">Manage Team</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
