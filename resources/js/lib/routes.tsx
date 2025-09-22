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
        create: 'competencies.create',
        store: 'competency.store',
        edit: 'competencies.edit',
        update: 'competency.update',
        delete: 'competency.delete',
    },
    jobFamilies: {
        store: 'job-families.store',
        show: 'job-families.show',
    },
    behavioralIndicators: {
        update: 'behavioral-indicator.update',
        delete: 'behavioral-indicator.delete',
        store: 'behavioral-indicator.store',
        reorder: 'behavioral-indicator.reorder',
    },
    dashboard: {
        index: 'dashboard',
    },
    offices: {
        store: 'offices.store',
        update: 'offices.update',
        delete: 'offices.delete',
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
        name: 'Manage',
        href: routes.competencies.types.index,
    },
];
