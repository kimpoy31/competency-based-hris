import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { Role } from '@/types';

interface Props {
    roles: Role[];
}

const AccountForm = ({ roles }: Props) => {
    return (
        <MainLayout>
            <Card>
                <h1 className="mb-6 card-title text-3xl font-bold text-base-content/80 uppercase">Create Account</h1>

                {/* Search SPMS Account */}
                <div className="mb-6">
                    <fieldset className="fieldset w-full max-w-md">
                        <legend className="fieldset-legend font-semibold">Search SPMS Account</legend>
                        <input type="text" className="input w-full" placeholder="Enter Fullname or Username" />
                    </fieldset>
                </div>

                <div className="divider my-6">OR</div>

                {/* Manual entry */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold">Firstname</legend>
                        <input type="text" className="input w-full" placeholder="Firstname" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold">Middlename</legend>
                        <input type="text" className="input w-full" placeholder="Middlename" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend font-semibold">Lastname</legend>
                        <input type="text" className="input w-full" placeholder="Lastname" />
                    </fieldset>
                </div>

                {/* Roles */}
                <fieldset className="mb-6 fieldset max-w-md">
                    <legend className="fieldset-legend font-semibold">Roles</legend>
                    <div className="mt-2 flex flex-col gap-2">
                        {roles.map((role) => (
                            <label key={role.id} className="flex items-center gap-2 font-medium capitalize">
                                <input type="checkbox" defaultChecked className="checkbox" />
                                <span>{role.name.replace('_', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Submit */}
                <div className="mt-6">
                    <button className="btn btn-wide btn-neutral">Create Account</button>
                </div>
            </Card>
        </MainLayout>
    );
};

export default AccountForm;
