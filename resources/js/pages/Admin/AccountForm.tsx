import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { Office, Role, SharedData, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    roles: Role[];
    user: User;
    offices: Office[];
}

const AccountForm = ({ user: { personal_data_sheet, roles: userRolesFromProps, id: userId }, offices, roles }: Props) => {
    const { user } = usePage<SharedData>().props.auth;
    const [userInfo, setUserInfo] = useState({
        firstname: personal_data_sheet?.firstname,
        middlename: personal_data_sheet?.middlename,
        lastname: personal_data_sheet?.lastname,
    });
    const [officeIdFilter, setOfficeIdFilter] = useState<string>(personal_data_sheet?.office?.id.toString() ?? '');
    const [userRoles, setUserRoles] = useState<Role[]>(userRolesFromProps ?? []);

    const handleRoleSelect = (role: Role) => {
        setUserRoles((prev) => {
            if (prev.some((r) => r.id === role.id)) {
                // remove role
                return prev.filter((r) => r.id !== role.id);
            } else {
                // add role
                return [...prev, role];
            }
        });
    };

    const areRolesEqual = (a: Role[], b: Role[]) => {
        if (a.length !== b.length) return false;
        const aIds = a.map((r) => r.id).sort();
        const bIds = b.map((r) => r.id).sort();
        return JSON.stringify(aIds) === JSON.stringify(bIds);
    };
    const hasRoleChanges = !areRolesEqual(userRoles, userRolesFromProps ?? []);
    const hasInfoChanges =
        userInfo.firstname !== personal_data_sheet?.firstname ||
        userInfo.middlename !== (personal_data_sheet?.middlename ?? '') ||
        userInfo.lastname !== personal_data_sheet?.lastname ||
        parseInt(officeIdFilter) !== personal_data_sheet?.office_id;

    const canSave =
        userRoles.length > 0 && userInfo.firstname?.trim() !== '' && userInfo.lastname?.trim() !== '' && (hasRoleChanges || hasInfoChanges);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await router.patch(route(routes.account.edit), {
            user_id: userId,
            firstname: userInfo.firstname,
            middlename: userInfo.middlename,
            lastname: userInfo.lastname,
            office_id: officeIdFilter,
            roles: userRoles.map((r) => r.id),
        });
    };

    console.log('user:', user);

    return (
        <MainLayout>
            <Card>
                <form onSubmit={(e) => handleSave(e)}>
                    <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">Account Information</h1>
                    <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                        <fieldset className="fieldset w-full max-w-sm">
                            <legend className="fieldset-legend">Firstname</legend>
                            <input
                                required
                                type="text"
                                className="input w-full"
                                value={userInfo.firstname}
                                onChange={(e) => setUserInfo((prev) => ({ ...prev, firstname: e.target.value }))}
                            />
                        </fieldset>
                        <fieldset className="fieldset w-full max-w-sm">
                            <legend className="fieldset-legend">Middlename</legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="( optional )"
                                value={userInfo.middlename ?? ''}
                                onChange={(e) => setUserInfo((prev) => ({ ...prev, middlename: e.target.value }))}
                            />
                        </fieldset>
                        <fieldset className="fieldset w-full max-w-sm">
                            <legend className="fieldset-legend">Lastname</legend>
                            <input
                                required
                                type="text"
                                className="input w-full"
                                value={userInfo.lastname}
                                onChange={(e) => setUserInfo((prev) => ({ ...prev, lastname: e.target.value }))}
                            />
                        </fieldset>
                    </div>
                    <fieldset className="fieldset w-full max-w-sm">
                        <legend className="fieldset-legend">Office</legend>
                        <select value={officeIdFilter} onChange={(e) => setOfficeIdFilter(e.target.value)} className="select w-full max-w-md">
                            {offices.map((office) => (
                                <option key={office.id} value={office.id}>
                                    {office.name} - {office.alias}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <h1 className="mt-4 mb-2 card-title text-2xl font-bold text-base-content/75 uppercase">Account Permissions</h1>
                    <fieldset className="fieldset w-64 p-4">
                        <legend className="fieldset-legend">Roles</legend>
                        {roles.map((role) => (
                            <label className="label text-lg font-bold capitalize" key={role.id}>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={(e) => handleRoleSelect(role)}
                                    checked={userRoles.some((r) => r.id === role.id)}
                                    disabled={!user.roles.some((r) => r.name === 'super_admin') && role.name === 'office_admin'}
                                />
                                {role.name.replace('_', ' ')}
                            </label>
                        ))}
                    </fieldset>
                    <div className="divider my-0"></div>
                    <div className="flex justify-end">
                        <button className="btn btn-wide btn-neutral" type="submit" disabled={!canSave}>
                            Save
                        </button>
                    </div>
                </form>
            </Card>
        </MainLayout>
    );
};

export default AccountForm;
