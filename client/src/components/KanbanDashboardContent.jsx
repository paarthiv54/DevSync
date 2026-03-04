import React, { useState } from "react";
import { kanbanTasks, kanbanDays, kanbanCurrentDate, kanbanCurrentUser, kanbanMonthColumns, kanbanMonthTasks, kanbanQuarterColumns, kanbanQuarterTasks } from "../data/KanbanDashboardData";

const KanbanDashboardContent = () => {
    const [viewMode, setViewMode] = useState('week');
    const [displayMode, setDisplayMode] = useState('week');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    const handleViewChange = (newMode) => {
        if (newMode === viewMode) return;
        setIsAnimating(true);
        setTimeout(() => {
            setDisplayMode(newMode);
            setViewMode(newMode);
            setTimeout(() => {
                setIsAnimating(false);
            }, 50);
        }, 300);
    };

    const currentTasks = displayMode === 'week' ? kanbanTasks : displayMode === 'month' ? kanbanMonthTasks : kanbanQuarterTasks;
    let currentColumns = displayMode === 'week' ? kanbanDays : displayMode === 'month' ? kanbanMonthColumns : kanbanQuarterColumns;

    if (isFiltered) {
        currentColumns = [...currentColumns].reverse();
    }

    return (
        <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="bg-white dark:bg-background-dark border-b border-border-dark px-8 py-6 flex-shrink-0 z-10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Timeline</h2>
                <div className="flex items-center space-x-5">
                    <button className="w-10 h-10 rounded-full border border-border-dark bg-transparent flex items-center justify-center text-text-secondary hover:text-white hover:bg-card-dark transition">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-border-dark bg-transparent flex items-center justify-center text-text-secondary hover:text-white hover:bg-card-dark transition relative">
                        <span className="material-symbols-outlined text-xl">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <img alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-border-dark cursor-pointer" src={kanbanCurrentUser.avatar} />
                </div>
            </header>

            <div className="flex-1 flex flex-col p-8 bg-background-light dark:bg-background-dark overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center bg-card-dark border border-border-dark rounded-xl px-4 py-2 cursor-pointer hover:border-gray-600 transition">
                            <span className="text-sm font-semibold text-white mr-3">Finance App</span>
                            <span className="material-symbols-outlined text-gray-500">expand_more</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-text-secondary hover:text-white"><span className="material-symbols-outlined">chevron_left</span></button>
                            <span className="text-lg font-bold text-white tracking-tight">{kanbanCurrentDate}</span>
                            <button className="text-text-secondary hover:text-white"><span className="material-symbols-outlined">chevron_right</span></button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-card-dark border border-border-dark rounded-xl p-1">
                            <button
                                onClick={() => handleViewChange('week')}
                                className={`px-4 py-1.5 text-xs font-medium transition ${viewMode === 'week' ? 'text-white bg-surface-dark rounded-lg shadow-sm' : 'text-text-secondary hover:text-white'}`}>
                                Week
                            </button>
                            <button
                                onClick={() => handleViewChange('month')}
                                className={`px-4 py-1.5 text-xs font-medium transition ${viewMode === 'month' ? 'text-white bg-surface-dark rounded-lg shadow-sm' : 'text-text-secondary hover:text-white'}`}>
                                Month
                            </button>
                            <button
                                onClick={() => handleViewChange('quarter')}
                                className={`px-4 py-1.5 text-xs font-medium transition ${viewMode === 'quarter' ? 'text-white bg-surface-dark rounded-lg shadow-sm' : 'text-text-secondary hover:text-white'}`}>
                                Quarter
                            </button>
                        </div>
                        <button
                            onClick={() => setIsFiltered(!isFiltered)}
                            className={`flex items-center space-x-2 px-4 py-2 border border-border-dark rounded-xl transition ${isFiltered ? 'bg-surface-dark text-white border-gray-500 shadow-sm' : 'text-text-secondary hover:text-white'}`}>
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                            <span className="text-sm font-medium">Filter</span>
                        </button>
                        <button className="flex items-center space-x-2 px-5 py-2 bg-primary rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span className="text-sm">Add Task</span>
                        </button>
                    </div>
                </div>

                <div
                    className="flex-1 overflow-auto bg-card-dark rounded-2xl border border-border-dark shadow-2xl relative"
                    style={{
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating ? 'scale(0.97)' : 'scale(1)'
                    }}
                >
                    <div className="absolute inset-0 pointer-events-none left-64 timeline-grid opacity-20" style={{ backgroundSize: `calc(100% / ${currentColumns.length}) 100%` }}></div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-border-dark">
                                <th className="sticky left-0 z-20 bg-card-dark w-64 text-left p-6 border-r border-border-dark">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Task Name</span>
                                </th>
                                <th className="p-0">
                                    <div className="flex w-full">
                                        {currentColumns.map((col, index) => (
                                            <div key={col.id} className={`flex-1 p-6 text-center ${index < currentColumns.length - 1 ? 'border-r border-border-dark/30' : ''}`}>
                                                <p className="text-xs font-bold text-gray-500 uppercase">{displayMode === 'week' ? col.date : col.title}</p>
                                                <p className="text-sm font-semibold text-white">{displayMode === 'week' ? col.day : col.subtitle}</p>
                                            </div>
                                        ))}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark/40 relative">
                            {currentTasks.map(task => (
                                <tr key={task.id} className="group hover:bg-surface-dark transition-colors">
                                    <td className="sticky left-0 z-20 bg-card-dark group-hover:bg-surface-dark p-6 border-r border-border-dark w-64">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-white">{task.title}</span>
                                            <span className="text-[10px] text-text-secondary mt-1">{task.category}</span>
                                        </div>
                                    </td>
                                    <td className="p-0 relative h-20">
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 px-2 z-10 cursor-move group/bar"
                                            style={{ left: task.left, width: task.width }}
                                        >
                                            <div className={`h-10 bg-${task.color}-500/10 border border-${task.color}-500/40 rounded-full flex items-center px-4 justify-between group-hover/bar:bg-${task.color}-500/20 transition-all`}>
                                                <div className="flex items-center space-x-3 overflow-hidden">
                                                    <div className={`w-2 h-2 rounded-full bg-${task.color}-500 flex-shrink-0`}></div>
                                                    <span className={`text-xs font-semibold text-${task.color}-400 truncate`}>{task.status}</span>
                                                    <div className={`flex-1 h-1 bg-${task.color}-500/20 rounded-full min-w-[40px]`}>
                                                        <div className={`h-full bg-${task.color}-500 rounded-full`} style={{ width: task.progress }}></div>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center ${task.avatars.length > 1 ? '-space-x-1.5' : ''} ml-2`}>
                                                    {task.avatars.map((avatar, idx) => (
                                                        <img key={idx} className="w-6 h-6 rounded-full border border-card-dark" src={avatar} alt="Avatar" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="absolute left-1 top-0 bottom-0 w-1 cursor-ew-resize"></div>
                                            <div className="absolute right-1 top-0 bottom-0 w-1 cursor-ew-resize"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            <tr className="h-20"><td className="sticky left-0 bg-card-dark border-r border-border-dark"></td><td></td></tr>
                            <tr className="h-20"><td className="sticky left-0 bg-card-dark border-r border-border-dark"></td><td></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default KanbanDashboardContent;
