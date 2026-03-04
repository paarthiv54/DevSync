import React from 'react';
import { workspaceNav, projects, currentUser } from '../data/mockData';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-background-dark border-r border-border-dark flex-shrink-0 flex flex-col h-full overflow-y-auto">
            <div className="p-5">
                <div className="flex items-center space-x-3 mb-8 px-1">
                    <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[20px]">check_small</span>
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm leading-tight text-white tracking-tight">Taskio</h1>
                        <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wider mt-0.5">AI task manager</p>
                    </div>
                </div>
                <div className="relative mb-6">
                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-text-secondary text-lg">search</span>
                    <input className="w-full bg-surface-dark border border-border-dark focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg py-1.5 pl-9 pr-3 text-sm placeholder-text-secondary/50 text-white transition-all duration-200" placeholder="Search..." type="text" />
                </div>
                <div className="mb-6">
                    <h3 className="text-[11px] font-medium text-text-secondary mb-2 px-2 uppercase tracking-widest">Workspace</h3>
                    <nav className="space-y-0.5">
                        {workspaceNav.map(nav => (
                            <a key={nav.id} className={`flex items-center space-x-2.5 px-2.5 py-1.5 rounded-md transition-all duration-200 ${nav.active ? 'bg-surface-dark text-white border border-border-dark shadow-sm' : 'text-text-secondary hover:text-white hover:bg-surface-dark'}`} href="#">
                                <span className="material-symbols-outlined text-[18px] text-white">{nav.icon}</span>
                                <span className="text-sm font-medium">{nav.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-2 px-2">
                        <h3 className="text-[11px] font-medium text-text-secondary uppercase tracking-widest">Projects</h3>
                        <button className="text-text-secondary hover:text-white transition"><span className="material-symbols-outlined text-sm">add</span></button>
                    </div>
                    <div className="space-y-0.5 mt-1">
                        {projects.map(project => (
                            <a key={project.id} className="flex items-center space-x-2.5 text-text-secondary hover:text-white px-2.5 py-1.5 rounded-md transition-all group" href="#">
                                <span className={`w-1.5 h-1.5 rounded-full bg-${project.color}`} style={{ boxShadow: `0 0 8px ${project.shadow}` }}></span>
                                <span className="text-sm">{project.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-auto p-4 border-t border-border-dark bg-background-dark">
                <div className="flex items-center space-x-3 cursor-pointer group hover:bg-surface-dark p-2 rounded-lg transition-colors">
                    <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-border-dark" src={currentUser.avatar} />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">{currentUser.name}</p>
                        <p className="text-[11px] text-text-secondary truncate">{currentUser.role}</p>
                    </div>
                    <span className="material-symbols-outlined text-text-secondary text-sm">unfold_more</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
