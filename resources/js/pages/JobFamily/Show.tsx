import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { JobFamily } from '@/types';
import { Link } from '@inertiajs/react';

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
                <div className="divider my-0"></div>
                <h1 className="text-lg font-bold text-base-content/75 uppercase">Competencies</h1>
                <div>
                    <Link href={route(routes.competencies.create, { jobFamilyId: jobFamily.id })} className="btn btn-sm btn-neutral">
                        New Competency
                    </Link>
                </div>
                {(jobFamily.competencies?.length ?? 0) > 0 ? 'table' : <DisplayEmpty />}
            </Card>
        </MainLayout>
    );
};

export default Show;
