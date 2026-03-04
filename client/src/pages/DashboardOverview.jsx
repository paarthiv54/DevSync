import React from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { StatCard } from "../components/dashboard/StatCard";
import { ProjectProgress } from "../components/dashboard/ProjectProgress";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { UpcomingTasks } from "../components/dashboard/UpcomingTasks";
import { TeamMembers } from "../components/dashboard/TeamMembers";
import { mockData } from "../data/mockData";

export const DashboardOverview = () => {
    return (
        <div className="bg-background-dark text-text-primary h-screen flex overflow-hidden dark antialiased selection:bg-primary/30 selection:text-white font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full bg-background-dark overflow-hidden relative">
                <Header />
                <div className="flex-1 overflow-y-auto p-8 pb-12 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {mockData.stats.map((stat, idx) => (
                            <StatCard key={idx} {...stat} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <ProjectProgress />
                        <RecentActivity />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <UpcomingTasks />
                        <TeamMembers />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardOverview;
