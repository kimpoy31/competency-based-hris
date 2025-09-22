import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { Office } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
// import { router } from '@inertiajs/react'; // Uncomment when hooking backend

interface Props {
    offices: Office[];
}

const Index = ({ offices }: Props) => {
    const modalIds = { officeFormModal: 'officeFormModal' };
    const [officeModalMode, setOfficeModalMode] = useState<'create' | 'edit' | 'delete' | null>(null);
    const [officeModalData, setOfficeModalData] = useState<Office>({ id: 0, name: '' });
    const [localOffices, setLocalOffices] = useState<Office[]>(offices);

    const openModal = (modalId: string) => {
        const modal = document.getElementById(modalId) as null | HTMLDialogElement;
        if (modal) modal.showModal();
    };

    const closeModal = (modalId: string) => {
        const modal = document.getElementById(modalId) as null | HTMLDialogElement;
        if (modal) modal.close();
    };

    const handleSave = async () => {
        if (officeModalMode === 'create') {
            await router.post(route(routes.offices.store), {
                name: officeModalData.name,
            });
        }

        if (officeModalMode === 'edit') {
            await router.put(route(routes.offices.update, { office: officeModalData.id }), { name: officeModalData.name });
        }

        if (officeModalMode === 'delete') {
            await router.delete(route(routes.offices.delete, { office: officeModalData.id }));
        }

        setOfficeModalData({ id: 0, name: '' });
        setOfficeModalMode(null);
        closeModal(modalIds.officeFormModal);
    };

    useEffect(() => {
        setLocalOffices(offices);
    }, [offices]);

    return (
        <MainLayout>
            <Card>
                <div className="flex justify-between">
                    <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">Offices</h1>
                    <div className="card-actions">
                        <button
                            className="btn btn-sm btn-neutral"
                            onClick={() => {
                                setOfficeModalMode('create');
                                setOfficeModalData({ id: 0, name: '' });
                                openModal(modalIds.officeFormModal);
                            }}
                        >
                            New Office
                        </button>
                    </div>
                </div>
                <div className="max-h-56 overflow-x-auto">
                    <table className="table-pin-rows table-pin-cols table">
                        <thead>
                            <tr>
                                <th>Office</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localOffices.map((office) => (
                                <tr key={office.id}>
                                    <td>{office.name}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => {
                                                    setOfficeModalMode('edit');
                                                    setOfficeModalData(office);
                                                    openModal(modalIds.officeFormModal);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => {
                                                    setOfficeModalMode('delete');
                                                    setOfficeModalData(office);
                                                    openModal(modalIds.officeFormModal);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal */}
            <dialog id="officeFormModal" className="modal">
                <div className="modal-box max-w-md">
                    <h3 className="text-lg font-bold capitalize">
                        {officeModalMode === 'create' && 'New Office'}
                        {officeModalMode === 'edit' && 'Edit Office'}
                        {officeModalMode === 'delete' && 'Delete Office'}
                    </h3>

                    {officeModalMode !== 'delete' ? (
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Office name</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={officeModalData.name}
                                onChange={(e) => setOfficeModalData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </fieldset>
                    ) : (
                        <p className="mt-4">
                            Are you sure you want to delete <b className="text-error-content">{officeModalData.name}</b>?
                        </p>
                    )}

                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                setOfficeModalMode(null);
                                setOfficeModalData({ id: 0, name: '' });
                                closeModal(modalIds.officeFormModal);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className={`btn ${officeModalMode === 'delete' ? 'btn-error' : 'btn-neutral'}`}
                            onClick={handleSave}
                            disabled={officeModalMode !== 'delete' && !officeModalData.name.trim()}
                        >
                            {officeModalMode === 'delete' ? 'Delete' : 'Save'}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </MainLayout>
    );
};

export default Index;
