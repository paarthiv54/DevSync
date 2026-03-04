export const workspaceNav = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard', active: true },
    { id: 'timeline', icon: 'calendar_today', label: 'Timeline', active: false },
    { id: 'messages', icon: 'chat_bubble_outline', label: 'Messages', active: false }
];

export const projects = [
    { id: 'finance', label: 'Finance App', color: 'indigo-500', shadow: 'rgba(99,102,241,0.5)' },
    { id: 'nft', label: 'NFT website', color: 'emerald-500', shadow: 'rgba(16,185,129,0.5)' },
    { id: 'crypto', label: 'Crypto App', color: 'orange-500', shadow: 'rgba(249,115,22,0.5)' }
];

export const currentUser = {
    name: 'Reza Taheri',
    role: 'Product Designer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzG4fQ14T7_JD4G9B1un28eR0RErp_uoHK-3WicmjbQ0Je8Cu6XnMtA2VI46iHSUmRa52m0BbyXVdyrz3GMCfWq5t8v6SnouOv2ossHDK3aloixiaXmbYOTetyRng8yRRZnqga-obuSChwbHdS4QSItF--2YXmCBrl-2t6TouoSFHqqa9XNleAIQxQLmyaGFD23eaHBZ5mbkUbkGMAF0wMcYFicEn1ok3MVx5ckTfO3fiI1UnHUoO4HElSwqIH24lZNU0NQlir_I'
};

export const statCards = [
    {
        id: 'total_tasks',
        title: 'Total Tasks',
        value: '24',
        icon: 'task',
        colorClass: 'blue-500',
        trend: '12%',
        trendUp: true,
        bars: [30, 50, 40, 70, 60, 80],
    },
    {
        id: 'completed',
        title: 'Completed',
        value: '12',
        icon: 'check_circle',
        colorClass: 'emerald-500',
        trend: '8%',
        trendUp: true,
        bars: [40, 60, 50, 40, 30, 65],
    },
    {
        id: 'active',
        title: 'Active',
        value: '8',
        icon: 'pending',
        colorClass: 'orange-500',
        trend: '0%',
        trendUp: null,
        bars: [50, 40, 60, 50, 60, 45],
    },
    {
        id: 'team_size',
        title: 'Team Size',
        value: '10',
        icon: 'group',
        colorClass: 'purple-500',
        trend: 'Stable',
        trendUp: null,
        bars: [90, 90, 90, 90, 90, 90],
    }
];

export const recentActivity = [
    {
        id: 1,
        user: 'Alex Johnson',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg4kDhCEdS0AXyYbcdovis5O8rq7OSSwQvr3i9s1Gm2Dbf87iCYN_CXLb8sIoFZffmb2czsr-wrcYtxV9lZ2iP8otGeg79WNYO3wGcM-N-BTvyZdmPsXu-s_98rYl-JLt6XHsIxJjemnTywty-o9HMa5vIBqSRD9ezwmTlwsKI6b4RUn_ERvKr4SU1yR0H5DzyBOH76MtARPs0fiuri2ejc8fExl19NS5SXlQyQsJb5ounr4mbYIyhgQ8ILQpPO2_kVFpENbXnmH0',
        action: 'updated',
        target: 'Design Assets',
        time: '10 minutes ago'
    },
    {
        id: 2,
        user: 'Olivia Smith',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS8yH2JRt_w0nWD71kOLL2t0SYj9-o_w6ljrfC6shALBmvBUF4apEdxAtNJ1LqEahjQziodB_WBP9eZg9MbqF879yH-knK9E0ejzpO8yKJF4pOofL1GXK08QgbJYpbM0Flef5XgobiW-DrO1n2CBQFa6COr9Qw61Gbz4M9kUDF1StVKe0iXX_sCrgBeURnrRDqQvJCfK_mc6xWhXZgORy9zk59fU1XoyJ5XVOrgPcRJ_uMf1PantZ5lNJtlQcYMP93cjSZsw8BvuI',
        action: 'uploaded',
        target: 'Wireframe_v2.fig',
        time: '1 hour ago'
    },
    {
        id: 3,
        user: 'John Doe',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZAo9nXWuHc_w5qZPLRpsaJY6ml1o6AvM0veT527DFQA1EmmVwlW3M1pTE0mAC9tVqmeujHpPyf8N-gLNw78fYj_RDVFqEMRpVaISMYKWdCbPlckCxW5go9KtJPk9CF8fi1TzEkj029FePY6qlYANIe5cCtQ5Taw08-EdGKMEXkD1Y1Cb8V7Gyw4RlAedWHmacd_WyYHB_mhJOXMpGDmyaE29T4kzy4O_hKFGC2QDD71IZGx7mpn83DWhVA83HJrXM4bczotkeZyU',
        action: 'completed',
        target: 'Sprint Backlog',
        time: '3 hours ago'
    }
];

export const upcomingTasks = [
    {
        id: 1,
        title: 'Review Signup Page',
        dueDate: 'Jun 12',
        status: 'IN PROGRESS',
        statusColor: 'blue',
        dotColor: 'blue-500',
        dotShadow: 'rgba(59,130,246,0.6)',
        assignees: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBg4kDhCEdS0AXyYbcdovis5O8rq7OSSwQvr3i9s1Gm2Dbf87iCYN_CXLb8sIoFZffmb2czsr-wrcYtxV9lZ2iP8otGeg79WNYO3wGcM-N-BTvyZdmPsXu-s_98rYl-JLt6XHsIxJjemnTywty-o9HMa5vIBqSRD9ezwmTlwsKI6b4RUn_ERvKr4SU1yR0H5DzyBOH76MtARPs0fiuri2ejc8fExl19NS5SXlQyQsJb5ounr4mbYIyhgQ8ILQpPO2_kVFpENbXnmH0',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAS8yH2JRt_w0nWD71kOLL2t0SYj9-o_w6ljrfC6shALBmvBUF4apEdxAtNJ1LqEahjQziodB_WBP9eZg9MbqF879yH-knK9E0ejzpO8yKJF4pOofL1GXK08QgbJYpbM0Flef5XgobiW-DrO1n2CBQFa6COr9Qw61Gbz4M9kUDF1StVKe0iXX_sCrgBeURnrRDqQvJCfK_mc6xWhXZgORy9zk59fU1XoyJ5XVOrgPcRJ_uMf1PantZ5lNJtlQcYMP93cjSZsw8BvuI'
        ]
    },
    {
        id: 2,
        title: 'Dribbble Inspiration',
        dueDate: 'Jun 14',
        status: 'TODO',
        statusColor: 'orange',
        dotColor: 'orange-500',
        dotShadow: 'rgba(249,115,22,0.6)',
        assignees: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBVpUqkRrpfOam1hmwLb5iFC2oj9dqpn-FqqnmKFn-h_qFhw7DqA0ks2jNMv5trydQRiVFyOpRr9hK2W5aMpBwMO7rcCpYSeu-3JpbBHN0pw8G-4nlFdFarSlPCGJekXTMhWM8KUNTaTr2azBzUL0X9APXsaAAuCDPCtbRt_-k8yVoyocrVPnBrjGtAw6Zec_JEkmmE3xupqXDUINsIy6Rtvrd1CRhgEj1VyZriDPnU-ZkC0tES9qDJe-Uy6SLInp143AHGWH_aDPQ'
        ]
    },
    {
        id: 3,
        title: 'Bug Fix Dashboard',
        dueDate: 'Jun 15',
        status: 'PAUSED',
        statusColor: 'red',
        dotColor: 'red-500',
        dotShadow: 'rgba(239,68,68,0.6)',
        assignees: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBZAo9nXWuHc_w5qZPLRpsaJY6ml1o6AvM0veT527DFQA1EmmVwlW3M1pTE0mAC9tVqmeujHpPyf8N-gLNw78fYj_RDVFqEMRpVaISMYKWdCbPlckCxW5go9KtJPk9CF8fi1TzEkj029FePY6qlYANIe5cCtQ5Taw08-EdGKMEXkD1Y1Cb8V7Gyw4RlAedWHmacd_WyYHB_mhJOXMpGDmyaE29T4kzy4O_hKFGC2QDD71IZGx7mpn83DWhVA83HJrXM4bczotkeZyU',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuzG4fQ14T7_JD4G9B1un28eR0RErp_uoHK-3WicmjbQ0Je8Cu6XnMtA2VI46iHSUmRa52m0BbyXVdyrz3GMCfWq5t8v6SnouOv2ossHDK3aloixiaXmbYOTetyRng8yRRZnqga-obuSChwbHdS4QSItF--2YXmCBrl-2t6TouoSFHqqa9XNleAIQxQLmyaGFD23eaHBZ5mbkUbkGMAF0wMcYFicEn1ok3MVx5ckTfO3fiI1UnHUoO4HElSwqIH24lZNU0NQlir_I'
        ]
    }
];

export const teamMembers = [
    {
        id: 1,
        name: 'Alex Johnson',
        role: 'UI Designer',
        tasks: 3,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg4kDhCEdS0AXyYbcdovis5O8rq7OSSwQvr3i9s1Gm2Dbf87iCYN_CXLb8sIoFZffmb2czsr-wrcYtxV9lZ2iP8otGeg79WNYO3wGcM-N-BTvyZdmPsXu-s_98rYl-JLt6XHsIxJjemnTywty-o9HMa5vIBqSRD9ezwmTlwsKI6b4RUn_ERvKr4SU1yR0H5DzyBOH76MtARPs0fiuri2ejc8fExl19NS5SXlQyQsJb5ounr4mbYIyhgQ8ILQpPO2_kVFpENbXnmH0'
    },
    {
        id: 2,
        name: 'Olivia Smith',
        role: 'Product Manager',
        tasks: 5,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS8yH2JRt_w0nWD71kOLL2t0SYj9-o_w6ljrfC6shALBmvBUF4apEdxAtNJ1LqEahjQziodB_WBP9eZg9MbqF879yH-knK9E0ejzpO8yKJF4pOofL1GXK08QgbJYpbM0Flef5XgobiW-DrO1n2CBQFa6COr9Qw61Gbz4M9kUDF1StVKe0iXX_sCrgBeURnrRDqQvJCfK_mc6xWhXZgORy9zk59fU1XoyJ5XVOrgPcRJ_uMf1PantZ5lNJtlQcYMP93cjSZsw8BvuI'
    },
    {
        id: 3,
        name: 'John Doe',
        role: 'Frontend Dev',
        tasks: 8,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZAo9nXWuHc_w5qZPLRpsaJY6ml1o6AvM0veT527DFQA1EmmVwlW3M1pTE0mAC9tVqmeujHpPyf8N-gLNw78fYj_RDVFqEMRpVaISMYKWdCbPlckCxW5go9KtJPk9CF8fi1TzEkj029FePY6qlYANIe5cCtQ5Taw08-EdGKMEXkD1Y1Cb8V7Gyw4RlAedWHmacd_WyYHB_mhJOXMpGDmyaE29T4kzy4O_hKFGC2QDD71IZGx7mpn83DWhVA83HJrXM4bczotkeZyU'
    }
];
