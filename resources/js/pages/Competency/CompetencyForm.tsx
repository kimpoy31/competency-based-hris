import Card from '@/components/Card';
import DisplayEmpty from '@/components/DisplayEmpty';
import MainLayout from '@/layouts/MainLayout';
import { routes } from '@/lib/routes';
import { BehavioralIndicator, JobFamily, ProficiencyLevel, Source } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    jobFamily: JobFamily;
    proficiencyLevels: ProficiencyLevel[];
}

const CompetencyForm = ({ jobFamily, proficiencyLevels }: Props) => {
    const [behavioralIndicators, setBehavioralIndicators] = useState<BehavioralIndicator[]>([]);

    const [competencyFormData, setCompetencyFormData] = useState({
        name: '',
        definition: '',
    });

    const [behavioralIndicatorFormData, setBehavioralIndicatorFormData] = useState({
        proficiency_level_id: null as null | number,
        definition: '',
    });

    const resetBehavioralIndicatorForm = () => {
        setBehavioralIndicatorFormData({ definition: '', proficiency_level_id: null });
    };

    const openBehavioralIndicatorModal = () => {
        const modal = document.getElementById('BehavioralIndicatorModal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };
    const closeBehavioralIndicatorModal = () => {
        const modal = document.getElementById('BehavioralIndicatorModal') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    const handleBehavioralIndicatorAdd = () => {
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

                <div className="divider"></div>
                <div className="flex flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-bold text-base-content/75 uppercase">Behavioral Indicators</h1>
                    <div>
                        <button className="btn btn-sm btn-secondary" onClick={openBehavioralIndicatorModal}>
                            New Indicator +
                        </button>
                    </div>
                </div>

                {proficiencyLevels.map((lvl) => (
                    <div key={lvl.id} className="my-4">
                        <h1 className="mb-2 text-xl font-bold text-base-content/75 uppercase">{lvl.name}</h1>
                        {behavioralIndicators.filter((bi) => bi.proficiency_level_id === lvl.id).length > 0 ? (
                            behavioralIndicators
                                .filter((bi) => bi.proficiency_level_id === lvl.id)
                                .sort((a, b) => a.order - b.order) // keep correct order
                                .map((indicator) => (
                                    <div
                                        className="mb-2 flex cursor-pointer flex-col gap-2 border-l-6 border-l-primary bg-base-100 p-4 shadow hover:bg-base-200/80"
                                        key={indicator.id}
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="font-bold">
                                                {lvl.level}.{indicator.order}
                                            </span>
                                            <textarea
                                                className="textarea w-full"
                                                value={indicator.definition}
                                                onChange={(e) => handleBehavioralIndicatorUpdate(indicator.id, e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="btn self-end btn-sm btn-error"
                                            onClick={() => handleBehavioralIndicatorRemove(indicator.id, lvl.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <DisplayEmpty />
                        )}
                    </div>
                ))}
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
            </Card>

            <dialog id="BehavioralIndicatorModal" className="modal">
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
                                closeBehavioralIndicatorModal();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleBehavioralIndicatorAdd();
                                resetBehavioralIndicatorForm();
                                closeBehavioralIndicatorModal();
                            }}
                            className="btn btn-neutral"
                            disabled={!behavioralIndicatorFormData.definition || !behavioralIndicatorFormData.proficiency_level_id}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={resetBehavioralIndicatorForm}>close</button>
                </form>
            </dialog>
        </MainLayout>
    );
};

export default CompetencyForm;
