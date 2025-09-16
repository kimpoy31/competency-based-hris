import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { JobFamily } from '@/types';

interface Props {
    jobFamily: JobFamily;
}

const Show = ({ jobFamily }: Props) => {
    return (
        <MainLayout>
            <Card>
                <div className="block w-full">
                    <h1 className="text-4xl font-bold uppercase">{jobFamily.name}</h1>
                    <h1 className="font-semibold uppercase italic">{jobFamily.competency_type?.name}</h1>
                </div>
            </Card>
        </MainLayout>
    );
};

export default Show;
