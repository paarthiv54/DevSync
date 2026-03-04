import React from "react";
import { messagesMenu, messagesProjects, messagesCurrentUser } from "../data/MessagesData";

const MessagesSidebar = () => {
    return (
        <aside className="w-64 bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex-shrink-0 flex flex-col h-full overflow-y-auto">
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <span className="material-symbols-outlined">check</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl leading-tight tracking-tight text-white">Taskio</h1>
                        <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wide">AI task manager</p>
                    </div>
                </div>

                <div className="relative mb-8">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-xl">search</span>
                    <input className="w-full bg-gray-100 dark:bg-[#1A1D21] border border-transparent dark:focus:border-border-dark dark:focus:ring-0 rounded-xl py-2.5 pl-10 pr-4 text-sm placeholder-gray-500 text-gray-300" placeholder="Search" type="text" />
                </div>

                <div className="mb-8">
                    <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wider">Main Menu</h3>
                    <nav className="space-y-1">
                        {messagesMenu.map(item => (
                            <a key={item.id} className={`flex items-center space-x-3 ${item.active ? 'text-white bg-card-dark' : 'text-text-secondary hover:text-white hover:bg-card-dark'} px-3 py-2.5 rounded-xl transition group`} href="#">
                                <span className={`material-symbols-outlined text-[22px] ${item.isPrimary ? 'text-primary' : 'group-hover:text-white'}`}>{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2 px-3">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Team Project</h3>
                        <button className="text-gray-500 hover:text-white transition"><span className="material-symbols-outlined text-lg">add</span></button>
                    </div>
                    <div className="space-y-1 mt-2">
                        <div className="pl-4 border-l border-border-dark space-y-3 py-1 ml-2">
                            {messagesProjects.map(project => (
                                <a key={project.id} className="flex items-center space-x-3 text-text-secondary hover:text-white group pl-4 py-1 relative" href="#">
                                    <div className={`w-2 h-2 rounded-full ${project.active ? 'bg-primary' : 'border border-gray-600 group-hover:border-gray-400'} absolute left-[-5px]`}></div>
                                    <span className="text-sm font-medium">{project.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto p-6 pt-0">
                <nav className="space-y-1 mb-6">
                    <a className="flex items-center space-x-3 text-text-secondary hover:text-white hover:bg-card-dark px-3 py-2.5 rounded-xl transition group" href="#">
                        <span className="material-symbols-outlined text-[22px] group-hover:text-white">notifications</span>
                        <span className="text-sm font-medium">Notification</span>
                    </a>
                    <a className="flex items-center space-x-3 text-text-secondary hover:text-white hover:bg-card-dark px-3 py-2.5 rounded-xl transition group" href="#">
                        <span className="material-symbols-outlined text-[22px] group-hover:text-white">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </a>
                </nav>

                <div className="bg-card-dark rounded-xl p-3 flex items-center justify-between border border-border-dark hover:border-gray-600 transition cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <img alt="User Avatar" className="w-9 h-9 rounded-full object-cover" src={messagesCurrentUser.avatar} />
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{messagesCurrentUser.name}</p>
                            <p className="text-xs text-text-secondary truncate">{messagesCurrentUser.role}</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-500 text-lg">expand_more</span>
                </div>
            </div>
        </aside>
    );
};

export default MessagesSidebar;
