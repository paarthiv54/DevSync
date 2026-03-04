import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects, userTasks } from "../api";
import { openSnackbar } from "../redux/snackbarSlice";
import { CircularProgress } from "@mui/material";

const DashboardStitch = ({ setNewProject, setNewTeam }) => {
    const dispatch = useDispatch();
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const [projRes, taskRes] = await Promise.all([
                getProjects(token),
                userTasks(token)
            ]);
            setProjects(projRes.data);
            setTasks(taskRes.data);
        } catch (err) {
            dispatch(
                openSnackbar({
                    message: err.response?.data?.message || "Error fetching data",
                    severity: "error",
                })
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalTasks = tasks.length;
    const completedTasksCount = tasks.filter(t => t.status?.toLowerCase() === "completed").length;
    const activeTasksCount = tasks.filter(t => t.status?.toLowerCase() !== "completed").length;
    const progressPercent = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0a0a" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] text-[#EDEDED] min-h-screen">
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
            `}
            </style>
            <div className="flex-1 p-8 pb-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#141414] p-5 rounded-xl border border-[#262626] hover:border-gray-700 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20">
                                <span className="material-symbols-outlined text-[20px]">task</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-[#A1A1AA] text-xs font-medium uppercase tracking-wide">Total Tasks</p>
                            <h4 className="text-2xl font-semibold text-white mt-1">{totalTasks}</h4>
                        </div>
                    </div>
                    <div className="bg-[#141414] p-5 rounded-xl border border-[#262626] hover:border-gray-700 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-[#A1A1AA] text-xs font-medium uppercase tracking-wide">Completed</p>
                            <h4 className="text-2xl font-semibold text-white mt-1">{completedTasksCount}</h4>
                        </div>
                    </div>
                    <div className="bg-[#141414] p-5 rounded-xl border border-[#262626] hover:border-gray-700 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 border border-orange-500/20">
                                <span className="material-symbols-outlined text-[20px]">pending</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-[#A1A1AA] text-xs font-medium uppercase tracking-wide">Active</p>
                            <h4 className="text-2xl font-semibold text-white mt-1">{activeTasksCount}</h4>
                        </div>
                    </div>
                    <div className="bg-[#141414] p-5 rounded-xl border border-[#262626] hover:border-gray-700 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 border border-purple-500/20">
                                <span className="material-symbols-outlined text-[20px]">group</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-[#A1A1AA] text-xs font-medium uppercase tracking-wide">Total Projects</p>
                            <h4 className="text-2xl font-semibold text-white mt-1">{projects.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2 bg-[#141414] rounded-xl border border-[#262626] p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h3 className="text-base font-semibold text-white">Project Progress</h3>
                                    <p className="text-xs text-[#A1A1AA] mt-1">Tracking completion across all tasks</p>
                                </div>
                            </div>
                            <div className="mb-8">
                                <div className="flex items-end space-x-2 mb-2">
                                    <span className="text-5xl font-bold text-white tracking-tight">{progressPercent}%</span>
                                    <span className="text-sm font-medium text-[#A1A1AA] mb-1.5">Complete</span>
                                </div>
                                <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ width: progressPercent + "%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 pb-12 custom-scrollbar">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
<div className="bg-card-dark p-5 rounded-xl border border-border-dark hover:border-gray-700 transition-colors group">
<div className="flex items-start justify-between mb-2">
<div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20">
<span className="material-symbols-outlined text-[20px]">task</span>
</div>
<span className="text-[11px] font-medium text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
<span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 12%
                    </span>
</div>
<div className="mt-3">
<p className="text-text-secondary text-xs font-medium uppercase tracking-wide">Total Tasks</p>
<h4 className="text-2xl font-semibold text-white mt-1">24</h4>
</div>
<div className="w-full h-8 mt-2 flex items-end space-x-1 opacity-50 group-hover:opacity-100 transition-opacity">
<div className="w-1/6 bg-blue-500/20 h-[30%] rounded-t-sm"></div>
<div className="w-1/6 bg-blue-500/20 h-[50%] rounded-t-sm"></div>
<div className="w-1/6 bg-blue-500/20 h-[40%] rounded-t-sm"></div>
<div className="w-1/6 bg-blue-500/20 h-[70%] rounded-t-sm"></div>
<div className="w-1/6 bg-blue-500/20 h-[60%] rounded-t-sm"></div>
<div className="w-1/6 bg-blue-500 h-[80%] rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
</div>
</div>
<div className="bg-card-dark p-5 rounded-xl border border-border-dark hover:border-gray-700 transition-colors group">
<div className="flex items-start justify-between mb-2">
<div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
</div>
<span className="text-[11px] font-medium text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
<span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 8%
                    </span>
</div>
<div className="mt-3">
<p className="text-text-secondary text-xs font-medium uppercase tracking-wide">Completed</p>
<h4 className="text-2xl font-semibold text-white mt-1">12</h4>
</div>
<div className="w-full h-8 mt-2 flex items-end space-x-1 opacity-50 group-hover:opacity-100 transition-opacity">
<div className="w-1/6 bg-emerald-500/20 h-[40%] rounded-t-sm"></div>
<div className="w-1/6 bg-emerald-500/20 h-[60%] rounded-t-sm"></div>
<div className="w-1/6 bg-emerald-500/20 h-[50%] rounded-t-sm"></div>
<div className="w-1/6 bg-emerald-500/20 h-[40%] rounded-t-sm"></div>
<div className="w-1/6 bg-emerald-500/20 h-[30%] rounded-t-sm"></div>
<div className="w-1/6 bg-emerald-500 h-[65%] rounded-t-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
</div>
</div>
<div className="bg-card-dark p-5 rounded-xl border border-border-dark hover:border-gray-700 transition-colors group">
<div className="flex items-start justify-between mb-2">
<div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 border border-orange-500/20">
<span className="material-symbols-outlined text-[20px]">pending</span>
</div>
<span className="text-[11px] font-medium text-text-secondary flex items-center bg-surface-dark px-1.5 py-0.5 rounded border border-border-dark">
                        0%
                    </span>
</div>
<div className="mt-3">
<p className="text-text-secondary text-xs font-medium uppercase tracking-wide">Active</p>
<h4 className="text-2xl font-semibold text-white mt-1">8</h4>
</div>
<div className="w-full h-8 mt-2 flex items-end space-x-1 opacity-50 group-hover:opacity-100 transition-opacity">
<div className="w-1/6 bg-orange-500/20 h-[50%] rounded-t-sm"></div>
<div className="w-1/6 bg-orange-500/20 h-[40%] rounded-t-sm"></div>
<div className="w-1/6 bg-orange-500/20 h-[60%] rounded-t-sm"></div>
<div className="w-1/6 bg-orange-500/20 h-[50%] rounded-t-sm"></div>
<div className="w-1/6 bg-orange-500/20 h-[60%] rounded-t-sm"></div>
<div className="w-1/6 bg-orange-500 h-[45%] rounded-t-sm shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
</div>
</div>
<div className="bg-card-dark p-5 rounded-xl border border-border-dark hover:border-gray-700 transition-colors group">
<div className="flex items-start justify-between mb-2">
<div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 border border-purple-500/20">
<span className="material-symbols-outlined text-[20px]">group</span>
</div>
<span className="text-[11px] font-medium text-text-secondary flex items-center bg-surface-dark px-1.5 py-0.5 rounded border border-border-dark">
                        Stable
                    </span>
</div>
<div className="mt-3">
<p className="text-text-secondary text-xs font-medium uppercase tracking-wide">Team Size</p>
<h4 className="text-2xl font-semibold text-white mt-1">10</h4>
</div>
<div className="w-full h-8 mt-2 flex items-end space-x-1 opacity-50 group-hover:opacity-100 transition-opacity">
<div className="w-1/6 bg-purple-500/20 h-[90%] rounded-t-sm"></div>
<div className="w-1/6 bg-purple-500/20 h-[90%] rounded-t-sm"></div>
<div className="w-1/6 bg-purple-500/20 h-[90%] rounded-t-sm"></div>
<div className="w-1/6 bg-purple-500/20 h-[90%] rounded-t-sm"></div>
<div className="w-1/6 bg-purple-500/20 h-[90%] rounded-t-sm"></div>
<div className="w-1/6 bg-purple-500 h-[90%] rounded-t-sm shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
<div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col h-full">
<h3 className="text-base font-semibold text-white mb-6 flex items-center">
                    Recent Activity
                    <span className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
</h3>
<div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
<div className="flex gap-3">
<img alt="User" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg4kDhCEdS0AXyYbcdovis5O8rq7OSSwQvr3i9s1Gm2Dbf87iCYN_CXLb8sIoFZffmb2czsr-wrcYtxV9lZ2iP8otGeg79WNYO3wGcM-N-BTvyZdmPsXu-s_98rYl-JLt6XHsIxJjemnTywty-o9HMa5vIBqSRD9ezwmTlwsKI6b4RUn_ERvKr4SU1yR0H5DzyBOH76MtARPs0fiuri2ejc8fExl19NS5SXlQyQsJb5ounr4mbYIyhgQ8ILQpPO2_kVFpENbXnmH0"/>
<div className="flex-1 min-w-0">
<p className="text-xs text-text-secondary leading-relaxed">
<span className="font-medium text-white">Alex Johnson</span> updated <span className="text-white hover:text-primary cursor-pointer transition-colors">Design Assets</span>
</p>
<span className="text-[10px] text-text-secondary/60 mt-0.5 block">10 minutes ago</span>
</div>
</div>
<div className="flex gap-3">
<img alt="User" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS8yH2JRt_w0nWD71kOLL2t0SYj9-o_w6ljrfC6shALBmvBUF4apEdxAtNJ1LqEahjQziodB_WBP9eZg9MbqF879yH-knK9E0ejzpO8yKJF4pOofL1GXK08QgbJYpbM0Flef5XgobiW-DrO1n2CBQFa6COr9Qw61Gbz4M9kUDF1StVKe0iXX_sCrgBeURnrRDqQvJCfK_mc6xWhXZgORy9zk59fU1XoyJ5XVOrgPcRJ_uMf1PantZ5lNJtlQcYMP93cjSZsw8BvuI"/>
<div className="flex-1 min-w-0">
<p className="text-xs text-text-secondary leading-relaxed">
<span className="font-medium text-white">Olivia Smith</span> uploaded <span className="text-white hover:text-primary cursor-pointer transition-colors">Wireframe_v2.fig</span>
</p>
<span className="text-[10px] text-text-secondary/60 mt-0.5 block">1 hour ago</span>
</div>
</div>
<div className="flex gap-3">
<img alt="User" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZAo9nXWuHc_w5qZPLRpsaJY6ml1o6AvM0veT527DFQA1EmmVwlW3M1pTE0mAC9tVqmeujHpPyf8N-gLNw78fYj_RDVFqEMRpVaISMYKWdCbPlckCxW5go9KtJPk9CF8fi1TzEkj029FePY6qlYANIe5cCtQ5Taw08-EdGKMEXkD1Y1Cb8V7Gyw4RlAedWHmacd_WyYHB_mhJOXMpGDmyaE29T4kzy4O_hKFGC2QDD71IZGx7mpn83DWhVA83HJrXM4bczotkeZyU"/>
<div className="flex-1 min-w-0">
<p className="text-xs text-text-secondary leading-relaxed">
<span className="font-medium text-white">John Doe</span> completed <span className="text-white hover:text-primary cursor-pointer transition-colors">Sprint Backlog</span>
</p>
<span className="text-[10px] text-text-secondary/60 mt-0.5 block">3 hours ago</span>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
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
<tr className="group hover:bg-surface-dark transition-colors duration-200">
<td className="py-3 px-5">
<div className="flex items-center space-x-3">
<div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
<span className="font-medium text-gray-200 group-hover:text-white transition-colors">Review Signup Page</span>
</div>
</td>
<td className="py-3 px-5 text-text-secondary font-mono text-xs">Jun 12</td>
<td className="py-3 px-5">
<div className="flex -space-x-2">
<img alt="A" className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg4kDhCEdS0AXyYbcdovis5O8rq7OSSwQvr3i9s1Gm2Dbf87iCYN_CXLb8sIoFZffmb2czsr-wrcYtxV9lZ2iP8otGeg79WNYO3wGcM-N-BTvyZdmPsXu-s_98rYl-JLt6XHsIxJjemnTywty-o9HMa5vIBqSRD9ezwmTlwsKI6b4RUn_ERvKr4SU1yR0H5DzyBOH76MtARPs0fiuri2ejc8fExl19NS5SXlQyQsJb5ounr4mbYIyhgQ8ILQpPO2_kVFpENbXnmH0"/>
<img alt="O" className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS8yH2JRt_w0nWD71kOLL2t0SYj9-o_w6ljrfC6shALBmvBUF4apEdxAtNJ1LqEahjQziodB_WBP9eZg9MbqF879yH-knK9E0ejzpO8yKJF4pOofL1GXK08QgbJYpbM0Flef5XgobiW-DrO1n2CBQFa6COr9Qw61Gbz4M9kUDF1StVKe0iXX_sCrgBeURnrRDqQvJCfK_mc6xWhXZgORy9zk59fU1XoyJ5XVOrgPcRJ_uMf1PantZ5lNJtlQcYMP93cjSZsw8BvuI"/>
</div>
</td>
<td className="py-3 px-5 text-right">
<span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        IN PROGRESS
                                    </span>
</td>
</tr>
<tr className="group hover:bg-surface-dark transition-colors duration-200">
<td className="py-3 px-5">
<div className="flex items-center space-x-3">
<div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
<span className="font-medium text-gray-200 group-hover:text-white transition-colors">Dribbble Inspiration</span>
</div>
</td>
<td className="py-3 px-5 text-text-secondary font-mono text-xs">Jun 14</td>
<td className="py-3 px-5">
<div className="flex -space-x-2">
<img alt="U" className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVpUqkRrpfOam1hmwLb5iFC2oj9dqpn-FqqnmKFn-h_qFhw7DqA0ks2jNMv5trydQRiVFyOpRr9hK2W5aMpBwMO7rcCpYSeu-3JpbBHN0pw8G-4nlFdFarSlPCGJekXTMhWM8KUNTaTr2azBzUL0X9APXsaAAuCDPCtbRt_-k8yVoyocrVPnBrjGtAw6Zec_JEkmmE3xupqXDUINsIy6Rtvrd1CRhgEj1VyZriDPnU-ZkC0tES9qDJe-Uy6SLInp143AHGWH_aDPQ"/>
</div>
</td>
<td className="py-3 px-5 text-right">
<span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                        TODO
                                    </span>
</td>
</tr>
<tr className="group hover:bg-surface-dark transition-colors duration-200">
<td className="py-3 px-5">
<div className="flex items-center space-x-3">
<div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
<span className="font-medium text-gray-200 group-hover:text-white transition-colors">Bug Fix Dashboard</span>
</div>
</td>
<td className="py-3 px-5 text-text-secondary font-mono text-xs">Jun 15</td>
<td className="py-3 px-5">
<div className="flex -space-x-2">
<img alt="U" className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZAo9nXWuHc_w5qZPLRpsaJY6ml1o6AvM0veT527DFQA1EmmVwlW3M1pTE0mAC9tVqmeujHpPyf8N-gLNw78fYj_RDVFqEMRpVaISMYKWdCbPlckCxW5go9KtJPk9CF8fi1TzEkj029FePY6qlYANIe5cCtQ5Taw08-EdGKMEXkD1Y1Cb8V7Gyw4RlAedWHmacd_WyYHB_mhJOXMpGDmyaE29T4kzy4O_hKFGC2QDD71IZGx7mpn83DWhVA83HJrXM4bczotkeZyU"/>
<img alt="U" className="w-6 h-6 rounded-full border border-card-dark ring-1 ring-black" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuzG4fQ14T7_JD4G9B1un28eR0RErp_uoHK-3WicmjbQ0Je8Cu6XnMtA2VI46iHSUmRa52m0BbyXVdyrz3GMCfWq5t8v6SnouOv2ossHDK3aloixiaXmbYOTetyRng8yRRZnqga-obuSChwbHdS4QSItF--2YXmCBrl-2t6TouoSFHqqa9XNleAIQxQLmyaGFD23eaHBZ5mbkUbkGMAF0wMcYFicEn1ok3MVx5ckTfO3fiI1UnHUoO4HElSwqIH24lZNU0NQlir_I"/>
</div>
</td>
<td className="py-3 px-5 text-right">
<span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                        PAUSED
                                    </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col">
<div className="flex items-center justify-between mb-6">
<h3 className="text-base font-semibold text-white">Team Members</h3>
<button className="text-text-secondary hover:text-white transition p-1 hover:bg-surface-dark rounded-md"><span className="material-symbols-outlined text-lg">add</span></button>
</div>
<div className="space-y-1 flex-1">
<div className="p-2.5 rounded-lg hover:bg-surface-dark transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-border-dark">
<div className="flex items-center space-x-3">
<img alt="Alex" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg4kDhCEdS0AXyYbcdovis5O8rq7OSSwQvr3i9s1Gm2Dbf87iCYN_CXLb8sIoFZffmb2czsr-wrcYtxV9lZ2iP8otGeg79WNYO3wGcM-N-BTvyZdmPsXu-s_98rYl-JLt6XHsIxJjemnTywty-o9HMa5vIBqSRD9ezwmTlwsKI6b4RUn_ERvKr4SU1yR0H5DzyBOH76MtARPs0fiuri2ejc8fExl19NS5SXlQyQsJb5ounr4mbYIyhgQ8ILQpPO2_kVFpENbXnmH0"/>
<div>
<h4 className="text-sm font-medium text-gray-200 group-hover:text-white leading-tight">Alex Johnson</h4>
<p className="text-[11px] text-text-secondary">UI Designer</p>
</div>
</div>
<div className="text-right">
<span className="text-xs font-mono font-medium text-text-secondary group-hover:text-primary transition-colors">3 Tasks</span>
</div>
</div>
<div className="p-2.5 rounded-lg hover:bg-surface-dark transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-border-dark">
<div className="flex items-center space-x-3">
<img alt="Olivia" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS8yH2JRt_w0nWD71kOLL2t0SYj9-o_w6ljrfC6shALBmvBUF4apEdxAtNJ1LqEahjQziodB_WBP9eZg9MbqF879yH-knK9E0ejzpO8yKJF4pOofL1GXK08QgbJYpbM0Flef5XgobiW-DrO1n2CBQFa6COr9Qw61Gbz4M9kUDF1StVKe0iXX_sCrgBeURnrRDqQvJCfK_mc6xWhXZgORy9zk59fU1XoyJ5XVOrgPcRJ_uMf1PantZ5lNJtlQcYMP93cjSZsw8BvuI"/>
<div>
<h4 className="text-sm font-medium text-gray-200 group-hover:text-white leading-tight">Olivia Smith</h4>
<p className="text-[11px] text-text-secondary">Product Manager</p>
</div>
</div>
<div className="text-right">
<span className="text-xs font-mono font-medium text-text-secondary group-hover:text-primary transition-colors">5 Tasks</span>
</div>
</div>
<div className="p-2.5 rounded-lg hover:bg-surface-dark transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-border-dark">
<div className="flex items-center space-x-3">
<img alt="John" className="w-8 h-8 rounded-full object-cover ring-1 ring-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZAo9nXWuHc_w5qZPLRpsaJY6ml1o6AvM0veT527DFQA1EmmVwlW3M1pTE0mAC9tVqmeujHpPyf8N-gLNw78fYj_RDVFqEMRpVaISMYKWdCbPlckCxW5go9KtJPk9CF8fi1TzEkj029FePY6qlYANIe5cCtQ5Taw08-EdGKMEXkD1Y1Cb8V7Gyw4RlAedWHmacd_WyYHB_mhJOXMpGDmyaE29T4kzy4O_hKFGC2QDD71IZGx7mpn83DWhVA83HJrXM4bczotkeZyU"/>
<div>
<h4 className="text-sm font-medium text-gray-200 group-hover:text-white leading-tight">John Doe</h4>
<p className="text-[11px] text-text-secondary">Frontend Dev</p>
</div>
</div>
<div className="text-right">
<span className="text-xs font-mono font-medium text-text-secondary group-hover:text-primary transition-colors">8 Tasks</span>
</div>
</div>
</div>
<button className="w-full mt-6 py-2 rounded-lg border border-border-dark text-xs font-medium text-text-secondary hover:text-white hover:bg-surface-dark transition-all duration-200">Manage Team</button>
</div>
</div>
</div>

            </div>
        </div>
    );
};

export default DashboardStitch;
