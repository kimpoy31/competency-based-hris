import MainLayout from '@/layouts/MainLayout';
import { Office } from '@/types';
import AccountsTable from './components/AccountsTable';
import OfficeTable from './components/OfficeTable';
// import { router } from '@inertiajs/react'; // Uncomment when hooking backend

interface Props {
    offices: Office[];
    employees: any;
}

const Index = ({ offices, employees }: Props) => {
    console.log(employees);

    return (
        <MainLayout className="flex flex-col items-center gap-8">
            <AccountsTable />
            <OfficeTable offices={offices} />
        </MainLayout>
    );
};

export default Index;
