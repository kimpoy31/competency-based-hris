import MainLayout from '@/layouts/MainLayout';
import { CompetencyType } from '@/types';

interface Props {
    competencyTypes: CompetencyType[];
}

const Index = ({ competencyTypes }: Props) => {
    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-8">
                {competencyTypes.map((type) => (
                    <div className="card w-full max-w-5xl bg-base-100 shadow-sm card-md" key={type.id}>
                        <div className="card-body">
                            <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">{type.name}</h1>
                            <div className="card-actions">
                                <button className="btn btn-sm btn-neutral">New Job Family</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <tbody>
                                        {(type.job_families?.length ?? 0) > 0 &&
                                            type.job_families &&
                                            type.job_families.map((fam) => (
                                                <tr key={fam.id}>
                                                    <td>{fam.name}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default Index;
