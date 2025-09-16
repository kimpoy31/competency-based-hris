import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { CompetencyType } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    competencyTypes: CompetencyType[];
}

const Index = ({ competencyTypes }: Props) => {
    const [modalInput, setModalInput] = useState('');
    const [modalData, setModalData] = useState<CompetencyType | null>(null);

    const openJobFamilyModal = () => {
        const modal = document.getElementById('jobFamilyModal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    const closeJobFamilyModal = () => {
        const modal = document.getElementById('jobFamilyModal') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    const clearData = () => {
        setModalData(null);
        setModalInput('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await router.post(
            route(routes.jobFamilies.store),
            {
                competency_type_id: modalData?.id,
                name: modalInput,
            },
            {
                onSuccess: () => {
                    clearData();
                    closeJobFamilyModal();
                },
            },
        );
    };

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-8">
                {competencyTypes.map((type) => (
                    <Card>
                        <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">{type.name}</h1>
                        <div className="card-actions">
                            <button
                                className="btn btn-sm btn-neutral"
                                onClick={() => {
                                    setModalData(type);
                                    openJobFamilyModal();
                                }}
                            >
                                New Job Family
                            </button>
                        </div>
                        {(type.job_families?.length ?? 0) ? (
                            type.job_families &&
                            type.job_families.map((fam) => (
                                <div
                                    key={fam.id}
                                    className="w-full cursor-pointer border-l-6 border-l-primary bg-base-200 p-4 font-semibold uppercase hover:bg-base-300"
                                >
                                    {fam.name}
                                </div>
                            ))
                        ) : (
                            <DisplayEmpty />
                        )}
                    </Card>
                ))}
            </div>

            <dialog id="jobFamilyModal" className="modal">
                <form onSubmit={(e) => handleSubmit(e)} className="modal-box max-w-sm">
                    <h3 className="text-lg font-bold">
                        New Job Family for <span className="capitalize">{modalData?.name}</span>
                    </h3>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input type="text" className="input w-full" required value={modalInput} onChange={(e) => setModalInput(e.target.value)} />
                    </fieldset>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                clearData();
                                closeJobFamilyModal();
                            }}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-neutral">
                            Save
                        </button>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={clearData}>close</button>
                </form>
            </dialog>
        </MainLayout>
    );
};

export default Index;
