export const routes = {
    auth: {
        login: {
            index: 'login.index',
            store: 'login.store',
        },
        logout: 'logout',
    },
    admin: {
        index: 'admin.index',
    },
    competencies: {
        types: {
            index: 'competencies.types.index',
        },
        show: 'competencies.show',
    },
    jobFamilies: {
        store: 'job-families.store',
        show: 'job-families.show',
    },
    dashboard: {
        index: 'dashboard',
    },
};

export const navRoutes = [
    {
        name: 'Dashboard',
        href: routes.dashboard.index,
    },
    {
        name: 'Admin',
        href: routes.admin.index,
    },
    {
        name: 'Manage Competencies',
        href: routes.competencies.types.index,
    },
];
