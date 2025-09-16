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
                    <div className="card w-full max-w-5xl bg-base-100 shadow-sm card-md" key={type.id}>
                        <div className="card-body">
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
                                <div className="overflow-x-auto border border-base-content/5">
                                    <table className="table">
                                        <tbody>
                                            {(type.job_families?.length ?? 0) > 0 &&
                                                type.job_families &&
                                                type.job_families.map((fam) => (
                                                    <tr key={fam.id}>
                                                        <td className="cursor-pointer bg-base-200 font-semibold uppercase">{fam.name}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <DisplayEmpty />
                            )}
                        </div>
                    </div>
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
