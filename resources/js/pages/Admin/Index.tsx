import MainLayout from '@/layouts/MainLayout';
import { Office, Role } from '@/types';
import AccountsTable from './components/AccountsTable';
import OfficeTable from './components/OfficeTable';

interface Props {
    offices: Office[];
    accounts_paginated: any;
    roles: Role[];
}

const Index = ({ offices, accounts_paginated, roles }: Props) => {
    return (
        <MainLayout className="flex flex-col items-center gap-8">
            <AccountsTable accounts_paginated={accounts_paginated} offices={offices} roles={roles} />
            <OfficeTable offices={offices} />
        </MainLayout>
    );
};

export default Index;
