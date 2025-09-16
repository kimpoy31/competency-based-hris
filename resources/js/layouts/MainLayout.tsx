import { navRoutes } from '@/lib/routes';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

const MainLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <div>
            <div>
                {navRoutes.map((nav, index) => (
                    <Link key={index} href={route(nav.href)} className="btn btn-neutral">
                        {nav.name}
                    </Link>
                ))}
            </div>
            <div className={`${className}`}>{children}</div>
        </div>
    );
};

export default MainLayout;
