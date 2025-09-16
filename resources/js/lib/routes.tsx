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
        name: 'Competency Types',
        href: routes.competencies.types.index,
    },
];
