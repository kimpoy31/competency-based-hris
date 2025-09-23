import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { Role } from '@/types';
import { SpmsUser } from '@/types/spms-types';
import axios from 'axios';
import { useState } from 'react';

interface Props {
    roles: Role[];
}

const AccountForm = ({ roles }: Props) => {
    const [formType, setFormType] = useState<'new_account' | 'spms_account'>('new_account');

    const [newAccountData, setNewAccountData] = useState<{ firstname: string; middlename: string; lastname: string }>({
        firstname: '',
        middlename: '',
        lastname: '',
    });
    const [searchedData, setSearchedData] = useState<SpmsUser[]>([]);
    const [spmsAccount, setSpmsAccount] = useState<null | SpmsUser>(null);
    const [formRoles, setFormRoles] = useState<number[]>([]);

    const handleRoleSelect = (roleId: number, isChecked: boolean) => {
        if (isChecked) {
            // Add role if not already in array
            setFormRoles((prev) => [...prev, roleId]);
        } else {
            // Remove role
            setFormRoles((prev) => prev.filter((id) => id !== roleId));
        }
    };

    const resetForm = () => {
        setFormRoles([]);
        setNewAccountData({ firstname: '', middlename: '', lastname: '' });
        setSpmsAccount(null);
        setSearchedData([]);
    };

    const searchAccounts = async (query: string) => {
        if (query.length < 3) {
            setSearchedData([]);
            return;
        }

        try {
            const res = await axios.get(route(routes.spms.search), {
                params: { q: query },
            });

            console.log(res.data); // already an object
            setSearchedData(res.data.data); // <-- use .data inside your JSON response
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <MainLayout>
            <Card>
                <h1 className="mb-6 card-title text-3xl font-bold text-base-content/80 uppercase">Create Account</h1>

                <ul className="menu menu-horizontal rounded-box font-semibold uppercase">
                    <li>
                        <a
                            className={`btn btn-sm lg:btn-md ${formType === 'new_account' ? 'btn-secondary' : 'btn-ghost'}`}
                            onClick={() => {
                                resetForm();
                                setFormType('new_account');
                            }}
                        >
                            New Account
                        </a>
                    </li>
                    <li>
                        <a
                            className={`btn btn-sm lg:btn-md ${formType === 'spms_account' ? 'btn-secondary' : 'btn-ghost'}`}
                            onClick={() => {
                                resetForm();
                                setFormType('spms_account');
                            }}
                        >
                            Spms Account
                        </a>
                    </li>
                </ul>

                {/* Search SPMS Account */}
                {formType === 'spms_account' && (
                    <div className="mb-6">
                        {!spmsAccount ? (
                            <>
                                <fieldset className="fieldset w-full max-w-md">
                                    <legend className="fieldset-legend font-semibold">Search SPMS Account</legend>
                                    <input
                                        type="text"
                                        className="input w-full"
                                        placeholder="Enter Fullname or Username"
                                        onChange={(e) => searchAccounts(e.target.value)}
                                    />
                                </fieldset>
                                {searchedData.length > 0 && (
                                    <div className="max-h-56 overflow-x-auto">
                                        <table className="table-pin-rows table-pin-cols table">
                                            <thead>
                                                <tr>
                                                    <td>Action</td>
                                                    <th>Name</th>
                                                    <td>Username</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchedData.map((data) => {
                                                    const fullName = [
                                                        data.spms_employee?.firstName ?? '',
                                                        data.spms_employee?.middleName ?? '',
                                                        data.spms_employee?.lastName ?? '',
                                                    ]
                                                        .filter(Boolean) // remove empty parts
                                                        .join(' ');

                                                    return (
                                                        <tr key={data.acc_id} className="hover">
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline btn-sm btn-neutral"
                                                                    onClick={() => {
                                                                        setSearchedData([]);
                                                                        setSpmsAccount(data);
                                                                    }}
                                                                >
                                                                    Select
                                                                </button>
                                                            </td>
                                                            <td className="font-medium">{fullName || '—'}</td>
                                                            <td className="text-base-content/70">{data.username}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="max-h-56 overflow-x-auto">
                                <table className="table-pin-rows table-pin-cols table bg-base-200">
                                    <thead>
                                        <tr>
                                            <td>Action</td>
                                            <th>Name</th>
                                            <td>Username</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={spmsAccount.acc_id} className="hover">
                                            <td className="text-base-content/70">
                                                <button className="btn btn-square btn-sm btn-error" onClick={() => setSpmsAccount(null)}>
                                                    x
                                                </button>
                                            </td>
                                            <td className="font-medium">
                                                {spmsAccount.spms_employee?.firstName +
                                                    ' ' +
                                                    spmsAccount.spms_employee?.middleName +
                                                    ' ' +
                                                    spmsAccount.spms_employee?.lastName}
                                            </td>
                                            <td className="text-base-content/70">{spmsAccount.username}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Manual entry */}
                {formType === 'new_account' && (
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold">Firstname</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={newAccountData.firstname}
                                onChange={(e) => setNewAccountData((prev) => ({ ...prev, firstname: e.target.value }))}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold">Middlename</legend>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Optional"
                                value={newAccountData.middlename}
                                onChange={(e) => setNewAccountData((prev) => ({ ...prev, middlename: e.target.value }))}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-semibold">Lastname</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={newAccountData.lastname}
                                onChange={(e) => setNewAccountData((prev) => ({ ...prev, lastname: e.target.value }))}
                            />
                        </fieldset>
                    </div>
                )}

                {/* Roles */}
                <fieldset className="mb-6 fieldset max-w-md">
                    <legend className="fieldset-legend font-semibold">Roles</legend>
                    <div className="mt-2 flex flex-col gap-2">
                        <div className="mt-2 flex flex-col gap-2">
                            {roles.map((role) => (
                                <label key={role.id} className="flex items-center gap-2 font-medium capitalize">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={formRoles.includes(role.id)}
                                        onChange={(e) => handleRoleSelect(role.id, e.target.checked)}
                                    />
                                    <span>{role.name.replace('_', ' ')}</span>
                                </label>
                            ))}
                        </div>
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
