import MainLayout from '@/layouts/MainLayout';
import { Competency } from '@/types';

interface Props {
    competency: Competency;
}

const Show = ({ competency }: Props) => {
    return <MainLayout>{competency.name}</MainLayout>;
};

export default Show;
