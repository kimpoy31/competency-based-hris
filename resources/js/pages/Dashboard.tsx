import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { Link } from '@inertiajs/react';

const Dashboard = () => {
    return (
        <MainLayout>
            <Link href={route(routes.admin.index)} className="btn btn-neutral">
                Admin
            </Link>
        </MainLayout>
    );
};

export default Dashboard;
