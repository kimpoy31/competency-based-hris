import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { BehavioralIndicator, Competency, JobFamily, ProficiencyLevel, Source } from '@/types';

import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { router } from '@inertiajs/react';
import { memo, useEffect, useState } from 'react';

// Moved SortableIndicator outside the main component to prevent re-rendering issues
const SortableIndicator = memo(
    ({ indicator, children, isReordering }: { indicator: BehavioralIndicator; children: React.ReactNode; isReordering: boolean }) => {
        if (!isReordering) {
            // Normal (no drag handles, just a wrapper)
            return <div>{children}</div>;
        }

        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: indicator.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {children}
            </div>
        );
    },
);

interface Props {
    jobFamily: JobFamily;
    proficiencyLevels: ProficiencyLevel[];
    competencyToEdit?: Competency;
}

const CompetencyForm = ({ jobFamily, proficiencyLevels, competencyToEdit }: Props) => {
    const [behavioralIndicators, setBehavioralIndicators] = useState<BehavioralIndicator[]>(competencyToEdit?.behavioral_indicators ?? []);
    const [indicatorToRemove, setIndicatorToRemove] = useState<null | BehavioralIndicator>(null);
    const modalIds = {
        behavioralIndicatorModal: 'behavioralIndicatorModal',
        deleteBehavioralIndicatorModal: 'deleteBehavioralIndicatorModal',
        deleteCompetencyModal: 'deleteCompetencyModal',
    };

    const [isReordering, setIsReordering] = useState(false);
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (competencyToEdit?.behavioral_indicators) {
            setBehavioralIndicators(competencyToEdit?.behavioral_indicators);
        }
    }, [competencyToEdit]);

    const [competencyFormData, setCompetencyFormData] = useState({
        name: competencyToEdit?.name ?? '',
        definition: competencyToEdit?.definition ?? '',
    });

    const [behavioralIndicatorFormData, setBehavioralIndicatorFormData] = useState({
        proficiency_level_id: null as null | number,
        definition: '',
    });

    const resetBehavioralIndicatorForm = () => {
        setBehavioralIndicatorFormData({ definition: '', proficiency_level_id: null });
    };

    const openModal = (modalId: string) => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) modal.showModal();
    };

    const closeModal = (modalId: string) => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) modal.close();
    };

    const handleBehavioralIndicatorAdd = async () => {
        if (competencyToEdit) {
            await router.post(
                route(routes.behavioralIndicators.store),
                {
                    competency_id: competencyToEdit.id,
                    proficiency_level_id: behavioralIndicatorFormData.proficiency_level_id ?? 0,
                    definition: behavioralIndicatorFormData.definition,
                },
                { preserveScroll: true },
            );
            return;
        }

        let categorizedIndicators = behavioralIndicators.filter((bi) => bi.proficiency_level_id === behavioralIndicatorFormData.proficiency_level_id);
        let order = categorizedIndicators.length + 1;

        const indicator = {
            id: Date.now(),
            user_id: 0,
            competency_id: 0,
            proficiency_level_id: behavioralIndicatorFormData.proficiency_level_id ?? 0,
            definition: behavioralIndicatorFormData.definition,
            source: 'system' as Source,
            order,
        };

        setBehavioralIndicators((prev) => [...prev, indicator]);
    };

    const handleBehavioralIndicatorUpdate = (id: number, newDefinition: string) => {
        setBehavioralIndicators((prev) => prev.map((bi) => (bi.id === id ? { ...bi, definition: newDefinition } : bi)));
    };

    const handleBehavioralIndicatorRemove = (id: number, proficiency_level_id: number) => {
        if (competencyToEdit) {
            setIndicatorToRemove(behavioralIndicators.find((bi) => bi.id === id) ?? null);
            openModal(modalIds.deleteBehavioralIndicatorModal);
            return;
        }

        setBehavioralIndicators((prev) => {
            const filtered = prev.filter((bi) => bi.id !== id);

            // re-order remaining indicators in the same proficiency level
            return filtered.map((bi) => {
                if (bi.proficiency_level_id === proficiency_level_id) {
                    return {
                        ...bi,
                        order: filtered.filter((x) => x.proficiency_level_id === proficiency_level_id).findIndex((x) => x.id === bi.id) + 1,
                    };
                }
                return bi;
            });
        });
    };

    const handleCompetencyCreate = async () => {
        await router.post(route(routes.competencies.store), {
            job_family_id: jobFamily.id,
            name: competencyFormData.name,
            definition: competencyFormData.definition,
            behavioralIndicators: behavioralIndicators.map((bi) => ({
                proficiency_level_id: bi.proficiency_level_id,
                definition: bi.definition,
                order: bi.order,
            })),
        });
    };

    const handleCompetencyUpdate = async () => {
        await router.post(route(routes.competencies.update), {
            competency_id: competencyToEdit?.id,
            name: competencyFormData.name,
            definition: competencyFormData.definition,
        });
    };

    const handleCompetencyDelete = async () => {
        await router.delete(route(routes.competencies.delete, { competency_id: competencyToEdit?.id }), {
            onSuccess: () => {
                closeModal(modalIds.deleteCompetencyModal);
            },
        });
    };

    const handleIndicatorUpdate = async (indicatorId: number) => {
        let indicator = behavioralIndicators.find((indicator) => indicator.id === indicatorId);

        await router.post(
            route(routes.behavioralIndicators.update),
            { behavioral_indicator_id: indicator?.id, definition: indicator?.definition },
            { preserveScroll: true },
        );
    };

    const handleIndicatorDelete = async (indicatorId: number) => {
        await router.delete(route(routes.behavioralIndicators.delete, { behavioral_indicator_id: indicatorId }), {
            preserveScroll: true,
            onSuccess: () => {
                setBehavioralIndicators((prev) => prev.filter((i) => i.id !== indicatorId));
                setIndicatorToRemove(null);
                closeModal(modalIds.deleteBehavioralIndicatorModal);
            },
        });
    };

    const saveReorderedIndicator = async (proficiencyLevelId: number) => {
        if (!competencyToEdit) {
            return;
        }
        // Get indicators for this specific proficiency level
        const levelIndicators = behavioralIndicators.filter((bi) => bi.proficiency_level_id === proficiencyLevelId).sort((a, b) => a.order - b.order);

        // Extract just the IDs in the current order
        const orderedIds = levelIndicators.map((indicator) => indicator.id);

        // Send to backend
        await router.post(
            route(routes.behavioralIndicators.reorder),
            {
                proficiency_level_id: proficiencyLevelId,
                ordered_ids: orderedIds,
            },
            { preserveScroll: true },
        );
    };

    return (
        <MainLayout>
            <Card>
                <div className="block w-full">
                    <h1 className="text-4xl font-bold uppercase">{jobFamily.name}</h1>
                    <h1 className="font-semibold uppercase italic">{jobFamily.competency_type?.name}</h1>
                </div>
                <div className="divider my-0"></div>
                <h1 className="text-lg font-bold text-base-content/75 uppercase">Competency</h1>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input
                        type="text"
                        className="input lg:input-lg"
                        value={competencyFormData.name}
                        onChange={(e) => setCompetencyFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </fieldset>
                <fieldset className="fieldset max-w-lg">
                    <legend className="fieldset-legend">Definition</legend>
                    <textarea
                        className="textarea w-full lg:textarea-lg"
                        value={competencyFormData.definition}
                        onChange={(e) => setCompetencyFormData((prev) => ({ ...prev, definition: e.target.value }))}
                    ></textarea>
                </fieldset>
                {competencyToEdit && (
                    <div className="flex justify-end">
                        <button
                            className="btn btn-neutral"
                            onClick={handleCompetencyUpdate}
                            disabled={
                                competencyToEdit.name === competencyFormData.name && competencyToEdit.definition === competencyFormData.definition
                            }
                        >
                            Save Changes
                        </button>
                    </div>
                )}
                <div className="divider"></div>
                <div className="flex flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-bold text-base-content/75 uppercase">Behavioral Indicators</h1>
                    <div className="flex gap-1">
                        {!isReordering ? (
                            <button className="btn btn-outline btn-sm" onClick={() => setIsReordering(true)}>
                                Reorder
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={async () => {
                                        // Save order for each proficiency level
                                        for (const level of proficiencyLevels) {
                                            await saveReorderedIndicator(level.id);
                                        }
                                        setIsReordering(false);
                                    }}
                                >
                                    Save Order
                                </button>
                                <button
                                    className="btn btn-sm"
                                    onClick={() => {
                                        setBehavioralIndicators(competencyToEdit?.behavioral_indicators ?? []);
                                        setIsReordering(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                                openModal(modalIds.behavioralIndicatorModal);
                            }}
                        >
                            New Indicator +
                        </button>
                    </div>
                </div>

                {proficiencyLevels.map((lvl) => {
                    const indicators = behavioralIndicators.filter((bi) => bi.proficiency_level_id === lvl.id).sort((a, b) => a.order - b.order);

                    return (
                        <div key={lvl.id} className="my-4">
                            <h1 className="mb-2 text-xl font-bold text-base-content/75 uppercase">{lvl.name}</h1>

                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={({ active, over }) => {
                                    if (!isReordering || !over || active.id === over.id) return;

                                    setBehavioralIndicators((items) => {
                                        const activeIndicator = items.find((i) => i.id === active.id);
                                        const overIndicator = items.find((i) => i.id === over.id);

                                        if (!activeIndicator || !overIndicator || activeIndicator.proficiency_level_id !== lvl.id) {
                                            return items;
                                        }

                                        const sameLevelIndicators = items
                                            .filter((i) => i.proficiency_level_id === lvl.id)
                                            .sort((a, b) => a.order - b.order);

                                        const oldIndex = sameLevelIndicators.findIndex((i) => i.id === active.id);
                                        const newIndex = sameLevelIndicators.findIndex((i) => i.id === over.id);

                                        const reordered = arrayMove(sameLevelIndicators, oldIndex, newIndex).map((i, idx) => ({
                                            ...i,
                                            order: idx + 1,
                                        }));

                                        return items.map((i) => (i.proficiency_level_id === lvl.id ? reordered.find((r) => r.id === i.id)! : i));
                                    });
                                }}
                            >
                                <SortableContext items={indicators.map((bi) => bi.id)} strategy={verticalListSortingStrategy}>
                                    {indicators.length > 0 ? (
                                        indicators.map((indicator) => {
                                            let originalIndicatorFromDb = competencyToEdit?.behavioral_indicators?.find((i) => i.id === indicator.id);

                                            return (
                                                <SortableIndicator key={indicator.id} indicator={indicator} isReordering={isReordering}>
                                                    <div className="mb-2 flex flex-col gap-2 border-l-6 border-l-primary bg-base-100 p-4 shadow">
                                                        <div className="flex items-start gap-4">
                                                            <span className="font-bold">
                                                                {lvl.level}.{indicator.order}
                                                            </span>
                                                            <textarea
                                                                className="textarea w-full"
                                                                value={indicator.definition}
                                                                disabled={isReordering}
                                                                onChange={(e) => handleBehavioralIndicatorUpdate(indicator.id, e.target.value)}
                                                                onPointerDown={(e) => {
                                                                    !isReordering && e.stopPropagation();
                                                                }}
                                                            />
                                                        </div>
                                                        {!isReordering && (
                                                            <div className="flex justify-end gap-1">
                                                                <button
                                                                    className="btn btn-sm btn-error"
                                                                    onClick={() => handleBehavioralIndicatorRemove(indicator.id, lvl.id)}
                                                                    onPointerDown={(e) => {
                                                                        !isReordering && e.stopPropagation();
                                                                    }}
                                                                >
                                                                    Remove
                                                                </button>
                                                                {competencyToEdit && (
                                                                    <button
                                                                        className="btn btn-sm btn-success"
                                                                        onClick={() => handleIndicatorUpdate(indicator.id)}
                                                                        disabled={indicator.definition === originalIndicatorFromDb?.definition}
                                                                        onPointerDown={(e) => {
                                                                            !isReordering && e.stopPropagation();
                                                                        }}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </SortableIndicator>
                                            );
                                        })
                                    ) : (
                                        <DisplayEmpty />
                                    )}
                                </SortableContext>
                            </DndContext>
                        </div>
                    );
                })}

                {!competencyToEdit && (
                    <>
                        <div className="divider"></div>
                        <div className="mt-4 flex justify-start">
                            <button
                                onClick={handleCompetencyCreate}
                                className="btn btn-wide btn-neutral"
                                disabled={!competencyFormData.definition || !competencyFormData.name}
                            >
                                Create Competency
                            </button>
                        </div>
                    </>
                )}
                <div className="divider"></div>
                <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
                    <button className="btn btn-error" onClick={() => openModal(modalIds.deleteCompetencyModal)}>
                        Delete Competency
                    </button>
                    <p className="text-sm text-error-content">
                        This will deactivate (soft delete) this competency. It will no longer appear in the list or be usable, but it can be restored
                        later by an administrator.
                    </p>
                </div>
            </Card>

            {/* Modals */}
            <dialog id="behavioralIndicatorModal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">New Behavioral Indicator</h3>
                    <fieldset className="fieldset max-w-lg">
                        <legend className="fieldset-legend">Proficiency Level</legend>
                        {proficiencyLevels.map((lvl) => (
                            <div
                                key={lvl.id}
                                className={`cursor-pointer px-4 py-2 capitalize hover:bg-base-300 ${
                                    behavioralIndicatorFormData.proficiency_level_id === lvl.id
                                        ? 'border-2 border-neutral bg-base-300 font-bold'
                                        : 'bg-base-300/50'
                                }`}
                                onClick={() => setBehavioralIndicatorFormData((prev) => ({ ...prev, proficiency_level_id: lvl.id }))}
                            >
                                {lvl.name}
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className="fieldset max-w-lg">
                        <legend className="fieldset-legend">Definition</legend>
                        <textarea
                            className="textarea w-full"
                            value={behavioralIndicatorFormData.definition}
                            onChange={(e) => setBehavioralIndicatorFormData((prev) => ({ ...prev, definition: e.target.value }))}
                        ></textarea>
                    </fieldset>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                resetBehavioralIndicatorForm();
                                closeModal(modalIds.behavioralIndicatorModal);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleBehavioralIndicatorAdd();
                                resetBehavioralIndicatorForm();
                                closeModal(modalIds.behavioralIndicatorModal);
                            }}
                            className="btn btn-neutral"
                            disabled={!behavioralIndicatorFormData.definition || !behavioralIndicatorFormData.proficiency_level_id}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => closeModal(modalIds.behavioralIndicatorModal)}>close</button>
                </form>
            </dialog>

            <dialog id="deleteBehavioralIndicatorModal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Delete Behavioral Indicator?</h3>
                    <div className="mt-4 flex items-start gap-4">
                        <span className="font-bold">
                            {proficiencyLevels.find((lvl) => lvl.id === indicatorToRemove?.proficiency_level_id)?.level}.{indicatorToRemove?.order}
                        </span>
                        <textarea className="textarea w-full" value={indicatorToRemove?.definition} disabled />
                    </div>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                setIndicatorToRemove(null);
                                closeModal(modalIds.deleteBehavioralIndicatorModal);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-error" onClick={() => handleIndicatorDelete(indicatorToRemove?.id!)}>
                            Remove
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button
                        onClick={() => {
                            setIndicatorToRemove(null);
                            closeModal(modalIds.deleteBehavioralIndicatorModal);
                        }}
                    >
                        close
                    </button>
                </form>
            </dialog>
            <dialog id="deleteCompetencyModal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Delete Competency</h3>
                    <p className="py-4">
                        Are you sure you want to delete this competency <span className="font-bold">({competencyToEdit?.name})</span>?
                    </p>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => {
                                closeModal(modalIds.deleteCompetencyModal);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                handleCompetencyDelete();
                            }}
                        >
                            Delete
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

export default CompetencyForm;
