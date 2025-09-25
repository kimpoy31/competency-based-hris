import MainLayout from '@/layouts/MainLayout';
import { Office } from '@/types';
import AccountsTable from './components/AccountsTable';
import OfficeTable from './components/OfficeTable';

interface Props {
    offices: Office[];
    accounts_paginated: any;
    filters?: {
        search?: string;
        office_id?: string;
    };
}

const Index = ({ offices, accounts_paginated, filters = {} }: Props) => {
    return (
        <MainLayout className="flex flex-col items-center gap-8">
            <AccountsTable accounts_paginated={accounts_paginated} offices={offices} filters={filters} />
            <OfficeTable offices={offices} />
        </MainLayout>
    );
};

export default Index;
