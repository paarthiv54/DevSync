import React from "react";

export const Header = () => {
    return (
        <header className="bg-background-dark/80 backdrop-blur-md border-b border-border-dark h-16 px-8 flex flex-shrink-0 items-center justify-between z-10 sticky top-0 w-full">
            <h2 className="text-sm font-medium text-text-secondary">
                Dashboard / <span className="text-white">Overview</span>
            </h2>
            <div className="flex items-center space-x-4">
                <button className="text-text-secondary hover:text-white transition p-1.5 rounded-md hover:bg-white/5">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
                <button className="text-text-secondary hover:text-white transition p-1.5 rounded-md hover:bg-white/5 relative">
                    <span className="material-symbols-outlined text-[20px]">
                        notifications
                    </span>
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-background-dark"></span>
                </button>
                <div className="h-6 w-[1px] bg-border-dark mx-2"></div>
                <a
                    className="text-xs font-medium text-text-secondary hover:text-white transition"
                    href="#"
                >
                    Feedback
                </a>
                <a
                    className="text-xs font-medium text-text-secondary hover:text-white transition"
                    href="#"
                >
                    Help
                </a>
            </div>
        </header>
    );
};
