import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { Competency, JobFamily } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    jobFamily: JobFamily;
    competencies: Competency[];
}

const Show = ({ jobFamily, competencies }: Props) => {
    return (
        <MainLayout>
            <Card>
                <div className="block w-full">
                    <h1 className="text-4xl font-bold uppercase">{jobFamily.name}</h1>
                    <h1 className="font-semibold uppercase italic">{jobFamily.competency_type?.name}</h1>
                </div>
                <div className="divider my-0"></div>
                <div className="flex flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-bold text-base-content/75 uppercase">Competencies</h1>
                    <div>
                        <Link href={route(routes.competencies.create, { jobFamilyId: jobFamily.id })} className="btn btn-sm btn-neutral">
                            New Competency
                        </Link>
                    </div>
                </div>
                {(competencies.length ?? 0) > 0 ? (
                    <div className="flex w-full">
                        {competencies.map((competency) => (
                            <Link
                                href={route(routes.competencies.edit, { jobFamilyId: jobFamily.id, competencyId: competency.id })}
                                key={competency.id}
                                className="mb-2 flex w-full cursor-pointer flex-col gap-2 border-l-6 border-l-primary bg-base-100 p-4 font-semibold uppercase shadow hover:bg-base-200/80"
                            >
                                {competency.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <DisplayEmpty />
                )}
            </Card>
        </MainLayout>
    );
};

export default Show;
