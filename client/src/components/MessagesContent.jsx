import React from "react";
import { messageThreads, activeChatHistory } from "../data/MessagesData";

const MessagesContent = () => {
    return (
        <main className="flex-1 flex overflow-hidden">
            <div className="w-[340px] border-r border-border-dark bg-background-dark flex flex-col h-full">
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Messages</h2>
                        <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary transition">
                            <span className="material-symbols-outlined text-xl">edit_square</span>
                        </button>
                    </div>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-lg">search</span>
                        <input className="w-full bg-[#1A1D21] border border-border-dark focus:border-primary focus:ring-0 rounded-xl py-2 pl-10 pr-4 text-sm placeholder-gray-500 text-gray-300" placeholder="Search messages..." type="text" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 pb-4">
                    <div className="space-y-1">
                        {messageThreads.map(thread => (
                            <div key={thread.id} className={`flex items-center p-3 rounded-2xl ${thread.isActive ? 'bg-card-dark border border-border-dark' : 'hover:bg-card-dark/50'} cursor-pointer transition`}>
                                <div className="relative flex-shrink-0">
                                    {thread.avatar ? (
                                        <img alt={thread.name} className="w-12 h-12 rounded-full object-cover" src={thread.avatar} />
                                    ) : (
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${thread.colorClass}`}>
                                            {thread.initials}
                                        </div>
                                    )}
                                    {thread.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background-dark rounded-full"></div>
                                    )}
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h4 className="text-sm font-semibold text-white truncate">{thread.name}</h4>
                                        <span className={`text-[10px] ${thread.isActive ? 'text-primary font-medium' : 'text-gray-500'}`}>{thread.time}</span>
                                    </div>
                                    {thread.isActive || thread.unreadCount > 0 ? (
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-text-secondary truncate pr-4">{thread.snippet}</p>
                                            {thread.unreadCount > 0 && (
                                                <span className="flex-shrink-0 w-5 h-5 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">{thread.unreadCount}</span>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-text-secondary truncate">{thread.snippet}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col h-full bg-[#0E1012] relative">
                <header className="h-20 flex-shrink-0 border-b border-border-dark flex items-center justify-between px-8 bg-background-dark/80 backdrop-blur-md z-10">
                    <div className="flex items-center">
                        <div className="relative mr-4">
                            <img alt="Active Chat Avatar" className="w-10 h-10 rounded-full object-cover border border-border-dark" src={messageThreads[0].avatar} />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background-dark rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white leading-tight">{messageThreads[0].name}</h3>
                            <p className="text-[11px] text-green-500 font-medium">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-card-dark transition">
                            <span className="material-symbols-outlined text-[22px]">call</span>
                        </button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-card-dark transition">
                            <span className="material-symbols-outlined text-[22px]">videocam</span>
                        </button>
                        <div className="w-px h-6 bg-border-dark mx-2"></div>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-card-dark transition">
                            <span className="material-symbols-outlined text-[22px]">more_vert</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col">
                    <div className="flex justify-center my-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-card-dark/50 px-3 py-1 rounded-full">Today</span>
                    </div>

                    {activeChatHistory.map(chat => (
                        <div key={chat.id} className={`flex ${chat.isSelf ? 'flex-col items-end max-w-[70%] self-end' : 'items-start max-w-[70%]'} group`}>
                            {!chat.isSelf && chat.avatar && (
                                <img alt="Avatar" className="w-8 h-8 rounded-full object-cover mt-1 flex-shrink-0" src={chat.avatar} />
                            )}
                            <div className={chat.isSelf ? '' : 'ml-3'}>
                                <div className={`${chat.isSelf ? 'bg-primary text-white text-sm py-3 px-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-500/10 leading-relaxed' : 'bg-card-dark border border-border-dark text-gray-200 text-sm py-3 px-4 rounded-2xl rounded-tl-none shadow-sm leading-relaxed'}`}>
                                    {chat.message}
                                </div>
                                <div className={`flex items-center mt-1 ${chat.isSelf ? 'mr-1 space-x-1 justify-end' : 'ml-1'}`}>
                                    <span className="text-[10px] text-gray-500">{chat.time}</span>
                                    {chat.isSelf && chat.readStatus && (
                                        <span className={`material-symbols-outlined ${chat.readColor} text-[14px] font-bold`}>{chat.readStatus}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-background-dark/50 border-t border-border-dark flex-shrink-0">
                    <div className="flex items-center space-x-3 bg-[#1A1D21] border border-border-dark rounded-2xl p-2 pl-4 focus-within:border-primary/50 transition-all">
                        <button className="text-gray-500 hover:text-white transition">
                            <span className="material-symbols-outlined text-[24px]">sentiment_satisfied</span>
                        </button>
                        <button className="text-gray-500 hover:text-white transition">
                            <span className="material-symbols-outlined text-[24px]">attach_file</span>
                        </button>
                        <input className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-200 py-2" placeholder="Type a message..." type="text" />
                        <div className="flex items-center space-x-2">
                            <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition">
                                <span className="material-symbols-outlined text-[24px]">mic</span>
                            </button>
                            <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition shadow-lg shadow-blue-500/20">
                                <span className="material-symbols-outlined text-[22px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MessagesContent;
