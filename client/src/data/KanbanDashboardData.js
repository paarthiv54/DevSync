export const kanbanMenu = [
    { id: 1, icon: 'grid_view', label: 'Dashboard', active: false },
    { id: 2, icon: 'calendar_today', label: 'Timeline', active: true },
    { id: 3, icon: 'chat_bubble_outline', label: 'Messages', active: false },
];

export const kanbanProjects = [
    { id: 1, name: 'Finance App', colorClass: 'bg-primary border-none', active: true },
    { id: 2, name: 'NFT website', colorClass: 'border-gray-600', active: false },
    { id: 3, name: 'Crypto App', colorClass: 'border-gray-600', active: false },
];

export const kanbanTasks = [
    {
        id: 1,
        title: 'Design Assets',
        category: 'Daily Task',
        status: 'On Going',
        progress: '60%',
        color: 'blue',
        left: '0%',
        width: '57.14%',
        avatars: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAQqfeBdkglR1VAhxQcXyo19gz0m9gDHJ2VhUee1bnsT3NnR93KZtBWtrcP7Nl57tbfrJ-lHjXZIsf1WU9zFK1FQw44wHZ5SmRyxwJzXLz9_4PYlmGrp_3ve7mFKKZOwYGLBwiTjDpV_enpO3zK1oZHxdMJBR7G_DIXJSuywVY848WaX3tfW55CJFia9iZzJWB2ibYm0G7FTRTmgiPuqDLzTe35JgVzGLbyvOtfaU2zLmk6sLqbFjT7w5sbf0DY-H7el0nxOjaRDf4",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAVIfWtNl9WjZjnIcZbPIQ6j5YGAfW3RyGQ4_oNAy5-aroREd0wfDFd_i1W72cs1axLGwPJpZ7F6hSUxlrPMW8EoTTEcdyIU2WA4FVh4Ttmnya_j4521PDJHAZeS9aWeZAWHVjCGTbohMNFpLXnrIrPCLX1pK7ou3eWSl4P3b3AXnABw0J-ip2zc9Y1zXi0ACLtUgyn1XeYjbd8jivxLVFXwSW64GntZzQbcoVoma5_FGN5Vq12CXubrSf3_vfl3YYNCK0NAwpPlRM"
        ]
    },
    {
        id: 2,
        title: 'Wireframe',
        category: 'Structure',
        status: 'Paused',
        progress: '75%',
        color: 'red',
        left: '28.57%',
        width: '57.14%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCy4XcJSqDPmriiWOvF2lvnUbwLGqpWD22sXZw8RkdlWwGihGLtJba24zc49u9IyN9DwwKgA_r5bQVHGBrEZgxLJoXVImq2ojibSQ6YGDVSbedXwWRIyjypAA9TycFqbQrZeBpFcX60X3LChU4nt8_yH5CSXT-gLZcIta6WOS7JyMy5_E-JqzMW8nlyDmXwqK2Oh_zZx7NmAE7rDchWfY3DVnnkgq4qEYYs6CA9Eas--CHPZnj5AeP0zsoCvz1wC4JYHdrAoM0g4DE"]
    },
    {
        id: 3,
        title: 'Research About AI',
        category: 'Exploration',
        status: 'Upcoming',
        progress: '10%',
        color: 'orange',
        left: '14.28%',
        width: '57.14%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDiUY2jIVXVZJM9dJ5RpZU-kacKDNfRWTlNsom9_Qx3EAK0e1OkJDCSXv3iHAclwMFff82yOsCYJ9spsP7gx14JLoW-wmQQscWG28vCXRv6iC3fX1k0ZCBwAp3V5pMtFln-6vu3uBudxU66-YYlipyIedcHJF23bA0SF_eCo-8sRSnq266kBRaWIEB293nQjxBmFB3fqLOO9YPq-M3r864GTZhcLmuvzJ-k3Bay7_uweYjhp3rxjpYZkPmFwjzVK4teUbEx7sVN4uk"]
    },
    {
        id: 4,
        title: 'Review Signup Page',
        category: 'Final Polish',
        status: 'Completed',
        progress: '100%',
        color: 'green',
        left: '42.85%',
        width: '57.14%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDXAov4cM7wPMz3WdQHCMuF4FyBoFZ41e1zcL-rpus69hvgruCEjc0mqhOi_VbL--AYym-tDFDj_moj9S-_qe2GdzNGT94zBQAGeWXS9Ue9NFPXHqaC-OnVif8RFCkXIluYRiEy_yE_ParnJPUqbaamjhaFJRd947lvR1u7uKzyImBP6l36QP2yVlyiu0fs21NIb-_vOpqEIMEv-hQAk7UgCmTg08SgfFhHsdc-0I5h4OCaKne00xaBGZiRxHcVBFNz7Vw0nHD693g"]
    }
];

export const kanbanCurrentUser = {
    name: "Reza Taheri",
    role: "Product Designer",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuzG4fQ14T7_JD4G9B1un28eR0RErp_uoHK-3WicmjbQ0Je8Cu6XnMtA2VI46iHSUmRa52m0BbyXVdyrz3GMCfWq5t8v6SnouOv2ossHDK3aloixiaXmbYOTetyRng8yRRZnqga-obuSChwbHdS4QSItF--2YXmCBrl-2t6TouoSFHqqa9XNleAIQxQLmyaGFD23eaHBZ5mbkUbkGMAF0wMcYFicEn1ok3MVx5ckTfO3fiI1UnHUoO4HElSwqIH24lZNU0NQlir_I"
};

export const kanbanCurrentDate = "June 2024";

export const kanbanDays = [
    { id: 1, date: "Jun 1", day: "Mon" },
    { id: 2, date: "Jun 2", day: "Tue" },
    { id: 3, date: "Jun 3", day: "Wed" },
    { id: 4, date: "Jun 4", day: "Thu" },
    { id: 5, date: "Jun 5", day: "Fri" },
    { id: 6, date: "Jun 6", day: "Sat" },
    { id: 7, date: "Jun 7", day: "Sun" },
];

export const kanbanMonthColumns = [
    { id: 1, title: "Week 1", subtitle: "Jun 1-7" },
    { id: 2, title: "Week 2", subtitle: "Jun 8-14" },
    { id: 3, title: "Week 3", subtitle: "Jun 15-21" },
    { id: 4, title: "Week 4", subtitle: "Jun 22-28" },
];

export const kanbanMonthTasks = [
    {
        id: 1,
        title: 'Full App Design',
        category: 'Core Epic',
        status: 'On Going',
        progress: '60%',
        color: 'blue',
        left: '0%',
        width: '50%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAQqfeBdkglR1VAhxQcXyo19gz0m9gDHJ2VhUee1bnsT3NnR93KZtBWtrcP7Nl57tbfrJ-lHjXZIsf1WU9zFK1FQw44wHZ5SmRyxwJzXLz9_4PYlmGrp_3ve7mFKKZOwYGLBwiTjDpV_enpO3zK1oZHxdMJBR7G_DIXJSuywVY848WaX3tfW55CJFia9iZzJWB2ibYm0G7FTRTmgiPuqDLzTe35JgVzGLbyvOtfaU2zLmk6sLqbFjT7w5sbf0DY-H7el0nxOjaRDf4"]
    },
    {
        id: 2,
        title: 'Backend Integration',
        category: 'Development',
        status: 'Paused',
        progress: '20%',
        color: 'red',
        left: '50%',
        width: '25%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCy4XcJSqDPmriiWOvF2lvnUbwLGqpWD22sXZw8RkdlWwGihGLtJba24zc49u9IyN9DwwKgA_r5bQVHGBrEZgxLJoXVImq2ojibSQ6YGDVSbedXwWRIyjypAA9TycFqbQrZeBpFcX60X3LChU4nt8_yH5CSXT-gLZcIta6WOS7JyMy5_E-JqzMW8nlyDmXwqK2Oh_zZx7NmAE7rDchWfY3DVnnkgq4qEYYs6CA9Eas--CHPZnj5AeP0zsoCvz1wC4JYHdrAoM0g4DE"]
    },
    {
        id: 3,
        title: 'Market Research',
        category: 'Discovery',
        status: 'Upcoming',
        progress: '5%',
        color: 'orange',
        left: '25%',
        width: '50%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDiUY2jIVXVZJM9dJ5RpZU-kacKDNfRWTlNsom9_Qx3EAK0e1OkJDCSXv3iHAclwMFff82yOsCYJ9spsP7gx14JLoW-wmQQscWG28vCXRv6iC3fX1k0ZCBwAp3V5pMtFln-6vu3uBudxU66-YYlipyIedcHJF23bA0SF_eCo-8sRSnq266kBRaWIEB293nQjxBmFB3fqLOO9YPq-M3r864GTZhcLmuvzJ-k3Bay7_uweYjhp3rxjpYZkPmFwjzVK4teUbEx7sVN4uk"]
    },
    {
        id: 4,
        title: 'Beta Testing',
        category: 'QA',
        status: 'Completed',
        progress: '100%',
        color: 'green',
        left: '75%',
        width: '25%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDXAov4cM7wPMz3WdQHCMuF4FyBoFZ41e1zcL-rpus69hvgruCEjc0mqhOi_VbL--AYym-tDFDj_moj9S-_qe2GdzNGT94zBQAGeWXS9Ue9NFPXHqaC-OnVif8RFCkXIluYRiEy_yE_ParnJPUqbaamjhaFJRd947lvR1u7uKzyImBP6l36QP2yVlyiu0fs21NIb-_vOpqEIMEv-hQAk7UgCmTg08SgfFhHsdc-0I5h4OCaKne00xaBGZiRxHcVBFNz7Vw0nHD693g"]
    }
];

export const kanbanQuarterColumns = [
    { id: 1, title: "Q1", subtitle: "Jan-Mar" },
    { id: 2, title: "Q2", subtitle: "Apr-Jun" },
    { id: 3, title: "Q3", subtitle: "Jul-Sep" },
    { id: 4, title: "Q4", subtitle: "Oct-Dec" },
];

export const kanbanQuarterTasks = [
    {
        id: 1,
        title: 'Q1 Objectives',
        category: 'Planning',
        status: 'Completed',
        progress: '100%',
        color: 'green',
        left: '0%',
        width: '25%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAQqfeBdkglR1VAhxQcXyo19gz0m9gDHJ2VhUee1bnsT3NnR93KZtBWtrcP7Nl57tbfrJ-lHjXZIsf1WU9zFK1FQw44wHZ5SmRyxwJzXLz9_4PYlmGrp_3ve7mFKKZOwYGLBwiTjDpV_enpO3zK1oZHxdMJBR7G_DIXJSuywVY848WaX3tfW55CJFia9iZzJWB2ibYm0G7FTRTmgiPuqDLzTe35JgVzGLbyvOtfaU2zLmk6sLqbFjT7w5sbf0DY-H7el0nxOjaRDf4"]
    },
    {
        id: 2,
        title: 'Mid-Year Review',
        category: 'Assessment',
        status: 'On Going',
        progress: '40%',
        color: 'blue',
        left: '25%',
        width: '50%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCy4XcJSqDPmriiWOvF2lvnUbwLGqpWD22sXZw8RkdlWwGihGLtJba24zc49u9IyN9DwwKgA_r5bQVHGBrEZgxLJoXVImq2ojibSQ6YGDVSbedXwWRIyjypAA9TycFqbQrZeBpFcX60X3LChU4nt8_yH5CSXT-gLZcIta6WOS7JyMy5_E-JqzMW8nlyDmXwqK2Oh_zZx7NmAE7rDchWfY3DVnnkgq4qEYYs6CA9Eas--CHPZnj5AeP0zsoCvz1wC4JYHdrAoM0g4DE"]
    },
    {
        id: 3,
        title: 'Year-End Wrap Up',
        category: 'Finalization',
        status: 'Upcoming',
        progress: '0%',
        color: 'orange',
        left: '75%',
        width: '25%',
        avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDiUY2jIVXVZJM9dJ5RpZU-kacKDNfRWTlNsom9_Qx3EAK0e1OkJDCSXv3iHAclwMFff82yOsCYJ9spsP7gx14JLoW-wmQQscWG28vCXRv6iC3fX1k0ZCBwAp3V5pMtFln-6vu3uBudxU66-YYlipyIedcHJF23bA0SF_eCo-8sRSnq266kBRaWIEB293nQjxBmFB3fqLOO9YPq-M3r864GTZhcLmuvzJ-k3Bay7_uweYjhp3rxjpYZkPmFwjzVK4teUbEx7sVN4uk"]
    }
];
