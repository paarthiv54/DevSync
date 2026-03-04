import React from 'react';
import KanbanDashboardSidebar from '../components/KanbanDashboardSidebar';
import KanbanDashboardContent from '../components/KanbanDashboardContent';

const KanbanDashboard = () => {
    return (
        <React.Fragment>
            <style>
                {`
                    body { font-family: 'Inter', sans-serif; }
                    ::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #16181C;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #2D3035;
                        border-radius: 10px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #4B5563;
                    }
                    .timeline-grid {
                        background-image: linear-gradient(to right, #2D3035 1px, transparent 1px);
                    }
                `}
            </style>

            <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen flex overflow-hidden dark">
                <KanbanDashboardSidebar />
                <KanbanDashboardContent />
            </div>
        </React.Fragment>
    );
};

export default KanbanDashboard;
