import { routes } from '@/lib/routes';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const Login = () => {
    const { errors } = usePage().props;
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await router.post(route(routes.auth.login.store), { ...credentials });
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={(e) => login(e)} className="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
                <label className="label">Username</label>
                <input
                    type="text"
                    className="input"
                    value={credentials.username}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Username"
                />
                {errors.username && <span className="text-center text-error">{errors.username}</span>}
                <label className="label">Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
                {errors.password && <span className="text-center text-error">{errors.password}</span>}
                <button className="btn mt-4 btn-neutral">Login</button>
            </form>
        </div>
    );
};

export default Login;
