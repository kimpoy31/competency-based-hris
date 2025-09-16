import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    maxWidth?:
        | 'max-w-sm'
        | 'max-w-md'
        | 'max-w-lg'
        | 'max-w-xl'
        | 'max-w-2xl'
        | 'max-w-3xl'
        | 'max-w-4xl'
        | 'max-w-5xl'
        | 'max-w-6xl'
        | 'max-w-7xl'
        | 'max-w-8xl'
        | 'max-w-9xl';
}

const Card = ({ children, maxWidth }: Props) => {
    return (
        <div className={`card w-full ${maxWidth ?? 'max-w-5xl'} bg-base-100 shadow-sm card-md`}>
            <div className="card-body">{children}</div>
        </div>
    );
};

export default Card;
