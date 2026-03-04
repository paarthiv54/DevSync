import React from 'react';
import MessagesSidebar from '../components/MessagesSidebar';
import MessagesContent from '../components/MessagesContent';

const MessagesDashboard = () => {
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
                        background: transparent; 
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #2D3035; 
                        border-radius: 10px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #4B5563; 
                    }
                `}
            </style>

            <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen flex overflow-hidden dark">
                <MessagesSidebar />
                <MessagesContent />
            </div>
        </React.Fragment>
    );
};

export default MessagesDashboard;
