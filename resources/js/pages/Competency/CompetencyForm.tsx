import Card from '@/components/Card';
import MainLayout from '@/layouts/MainLayout';
import { JobFamily } from '@/types';

interface Props {
    jobFamily: JobFamily;
}

const CompetencyForm = ({ jobFamily }: Props) => {
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
                    <input type="text" className="input lg:input-lg" />
                </fieldset>
                <fieldset className="fieldset max-w-lg">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea className="textarea w-full lg:textarea-lg"></textarea>
                </fieldset>
                <div className="divider"></div>
                <h1 className="text-lg font-bold text-base-content/75 uppercase">Behavioral Indicators</h1>
                <div>
                    <button className="btn btn-sm btn-neutral">New Indicator</button>
                </div>
            </Card>
        </MainLayout>
    );
};

export default CompetencyForm;
