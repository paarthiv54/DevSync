import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const StitchDashboard = () => {
    return (
        <div className="bg-background-dark text-text-primary h-screen flex overflow-hidden dark antialiased selection:bg-primary/30 selection:text-white">
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #0a0a0a; 
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #262626; 
                        border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #404040; 
                    }
                    .glass-panel {
                        background: rgba(20, 20, 20, 0.7);
                        backdrop-filter: blur(10px);
                    }
                `}
            </style>
            <Sidebar />
            <main className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden relative">
                <Header />
                <DashboardContent />
            </main>
        </div>
    );
};

export default StitchDashboard;
