import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { JobFamily, ProficiencyLevel } from '@/types';
import { useState } from 'react';

interface Props {
    jobFamily: JobFamily;
    proficiencyLevels: ProficiencyLevel[];
}

const CompetencyForm = ({ jobFamily, proficiencyLevels }: Props) => {
    const [formData, setFormData] = useState({
        competencyName: '',
        competencyDescription: '',
        proficiency_level_id: null as null | number,
    });

    const resetFormData = () => {
        setFormData({ competencyName: '', competencyDescription: '', proficiency_level_id: null });
    };

    const openBehavioralIndicatorModal = () => {
        const modal = document.getElementById('BehavioralIndicatorModal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <MainLayout>
            <Card>
                <div className="block w-full">
                    <h1 className="text-4xl font-bold uppercase">{jobFamily.name}</h1>
                    <h1 className="font-semibold uppercase italic">{jobFamily.competency_type?.name}</h1>
                </div>
                <div className="divider my-0"></div>
                <h1 className="text-lg font-bold text-base-content/75 uppercase">Competency Form</h1>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input
                        type="text"
                        className="input lg:input-lg"
                        value={formData.competencyName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, competencyName: e.target.value }))}
                    />
                </fieldset>
                <fieldset className="fieldset max-w-lg">
                    <legend className="fieldset-legend">Definition</legend>
                    <textarea
                        className="textarea w-full lg:textarea-lg"
                        value={formData.competencyDescription}
                        onChange={(e) => setFormData((prev) => ({ ...prev, competencyDescription: e.target.value }))}
                    ></textarea>
                </fieldset>
                <div className="divider"></div>
                <h1 className="text-lg font-bold text-base-content/75 uppercase">Behavioral Indicators</h1>
                <div>
                    <button className="btn btn-sm btn-neutral" onClick={openBehavioralIndicatorModal}>
                        New Indicator
                    </button>
                </div>
                {proficiencyLevels.map((lvl) => (
                    <div key={lvl.id} className="rounded-xl bg-base-200 p-4 shadow">
                        <h1 className="text-xl font-bold text-base-content/75 uppercase">{lvl.name}</h1>
                        {JSON.stringify(jobFamily)}
                    </div>
                ))}
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
                                    formData.proficiency_level_id === lvl.id ? 'border-2 border-neutral bg-base-300 font-bold' : 'bg-base-300/50'
                                }`}
                                onClick={() => setFormData((prev) => ({ ...prev, proficiency_level_id: lvl.id }))}
                            >
                                {lvl.name}
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className="fieldset max-w-lg">
                        <legend className="fieldset-legend">Definition</legend>
                        <textarea className="textarea w-full"></textarea>
                    </fieldset>
                    <div className="modal-action">
                        <button className="btn" onClick={resetFormData}>
                            Cancel
                        </button>
                        <button className="btn btn-neutral">Save</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={resetFormData}>close</button>
                </form>
            </dialog>
        </MainLayout>
    );
};

export default CompetencyForm;
