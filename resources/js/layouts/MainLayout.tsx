import { navRoutes, routes } from '@/lib/routes';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

const MainLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const NavLinks = () => {
        return navRoutes.map((nav, index) => (
            <div className="indicator" key={index}>
                {nav.indicator && <span className="indicator-item status status-accent text-xs"></span>}
                <Link href={route(nav.href)} className="btn btn-secondary">
                    {nav.name}
                </Link>
            </div>
        ));
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // scrolling down → hide
                setShowNavbar(false);
            } else {
                // scrolling up → show
                setShowNavbar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div
                        className={`fixed top-0 z-50 navbar w-full bg-base-200/90 shadow transition-transform duration-300 ${
                            showNavbar ? 'translate-y-0' : '-translate-y-full'
                        }`}
                    >
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <Menu />
                            </label>
                        </div>
                        <Link href={route(routes.dashboard.index)} className="relative mx-2 flex-1 px-2 text-xl">
                            <span className="font-carter-one absolute -top-4.5 text-2xl italic">Ihris</span>
                            <span className="font-carter-one absolute top-1 text-sm text-accent italic">Competency Based</span>
                        </Link>
                        <div className="hidden flex-none lg:block">
                            <div className="menu menu-horizontal gap-2">
                                <NavLinks />
                            </div>
                        </div>
                    </div>

                    {/* Page content here */}
                    <div className={`${className} mt-16 flex w-full justify-center lg:py-4`}>{children}</div>
                </div>

                {/* Drawer sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu min-h-full w-full max-w-64 gap-0.5 bg-base-200 p-4">
                        <NavLinks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
