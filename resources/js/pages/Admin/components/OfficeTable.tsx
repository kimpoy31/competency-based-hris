import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';
import { routes } from '@/lib/routes';
import { Office } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
    offices: Office[];
}

const OfficeTable = ({ offices }: Props) => {
    const modalIds = { officeFormModal: 'officeFormModal' };
    const [officeModalMode, setOfficeModalMode] = useState<'create' | 'edit' | 'delete' | null>(null);
    const [officeModalData, setOfficeModalData] = useState<Office>({ id: 0, name: '', alias: '' });
    const [localOffices, setLocalOffices] = useState<Office[]>(offices);
    const [search, setSearch] = useState<string>(''); // 🔍 search state

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

        setOfficeModalData({ id: 0, name: '', alias: '' });
        setOfficeModalMode(null);
        closeModal(modalIds.officeFormModal);
    };

    useEffect(() => {
        setLocalOffices(offices);
    }, [offices]);

    // 🔍 filter offices based on search
    const filteredOffices = localOffices.filter((office) => office.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Card>
                <div className="flex flex-wrap items-center justify-between gap-y-2">
                    <h1 className="card-title text-2xl font-bold text-base-content/75 uppercase">Offices</h1>
                </div>
                {/* 🔍 Search Field */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Search</legend>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search offices..."
                            className="input-bordered input input-sm w-48"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="btn btn-sm btn-neutral"
                            onClick={() => {
                                setOfficeModalMode('create');
                                setOfficeModalData({ id: 0, name: '', alias: '' });
                                openModal(modalIds.officeFormModal);
                            }}
                        >
                            New Office
                        </button>
                    </div>
                </fieldset>

                {filteredOffices.length > 0 ? (
                    <div className="max-h-56 overflow-x-auto">
                        <table className="table-pin-rows table-pin-cols table table-zebra">
                            <thead>
                                <tr>
                                    <th className="lg:hidden">Action</th>
                                    <th>Office</th>
                                    <th className="hidden lg:block">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOffices.map((office) => (
                                    <tr key={office.id}>
                                        <td className="lg:hidden">
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
                                        <td>{office.name}</td>
                                        <td className="hidden lg:block">
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
                ) : (
                    <DisplayEmpty />
                )}
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
                                setOfficeModalData({ id: 0, name: '', alias: '' });
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
        </>
    );
};

export default OfficeTable;
