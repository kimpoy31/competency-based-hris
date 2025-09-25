import Card from '@/components/Card';
import { routes } from '@/lib/routes';
import { Office, Role, User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
    accounts_paginated: {
        current_page: number;
        last_page: number;
        data: User[];
        next_page_url: string;
        prev_page_url: string;
        from?: number;
        to?: number;
        total?: number;
    };
    offices: Office[];
    roles: Role[];
}

const AccountsTable = ({
    accounts_paginated: { data, next_page_url, prev_page_url, current_page, last_page, from, to, total },
    offices,
    roles,
}: Props) => {
    const [officeIdFilter, setOfficeIdFilter] = useState<string>('');
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [roleIdFilter, setRoleIdFilter] = useState<string>('');

    const filterTable = async (officeId?: string, search?: string, roleIdFilter?: string) => {
        const params: Record<string, string> = {};

        if (officeId) {
            params.office_id = officeId;
        }

        if (search) {
            params.search = search;
        }

        if (roleIdFilter) {
            params.role_id = roleIdFilter;
        }

        await router.get(route(routes.admin.index), params, { preserveState: true, preserveScroll: true });
    };

    useEffect(() => {
        filterTable(officeIdFilter, searchFilter, roleIdFilter);
    }, [officeIdFilter, searchFilter, roleIdFilter]);

    return (
        <Card>
            <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">Manage Accounts</h1>
            <div className="flex gap-2">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Office</legend>
                    <select value={officeIdFilter} onChange={(e) => setOfficeIdFilter(e.target.value)} className="select w-28 select-sm">
                        <option value={''}>No Filter</option>
                        {offices.map((office) => (
                            <option key={office.id} value={office.id}>
                                {office.alias}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Role</legend>
                    <select value={roleIdFilter} onChange={(e) => setRoleIdFilter(e.target.value)} className="select w-28 select-sm">
                        <option value={''}>No Filter</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id} className="capitalize">
                                {role.name.replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Search</legend>
                    <input
                        type="text"
                        className="input input-sm"
                        placeholder="Name / Username"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </fieldset>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="lg:hidden">Action</th>
                            <th>Name</th>
                            <th>Office</th>
                            <th>Roles</th>
                            <th className="hidden lg:block">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td className="lg:hidden">
                                    <button className="btn btn-sm btn-secondary">Details</button>
                                </td>
                                <td>{user.personal_data_sheet?.fullname}</td>
                                <td>{user.personal_data_sheet?.office?.alias}</td>
                                <td className="capitalize">{user.roles.map((role) => role.name.replace('_', ' ')).join(', ')}</td>
                                <td className="hidden lg:block">
                                    <Link href={route(routes.account.update, { userId: user.id })} className="btn btn-sm btn-secondary">
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1">
                    <Link href={prev_page_url ?? '#'} className="btn btn-secondary" disabled={current_page === 1} preserveState preserveScroll>
                        Prev
                    </Link>
                    <Link
                        href={next_page_url ?? '#'}
                        className="btn btn-secondary"
                        disabled={current_page === last_page}
                        preserveState
                        preserveScroll
                    >
                        Next
                    </Link>
                </div>
                <div className="italic">
                    Page {current_page} of {last_page}
                </div>
            </div>
        </Card>
    );
};

export default AccountsTable;
