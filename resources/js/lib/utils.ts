import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const cityOffices = [
    'City Accounting Office',
    "City Administrator's Office",
    "City Administrator's Office - Bids & Awards Committee Section",
    "City Administrator's Office - Culture, Arts, Investment Promotion & Tourism Office",
    'City Agriculture Engineering Section',
    'City Agriculture Office',
    "City Assessor's Office",
    'City Budget Office',
    'City Civil Registry Office',
    'City College of Bayawan',
    'City Cooperative and Manpower Development Office',
    'City Engineering Office',
    'City Environment & Natural Resources Office',
    'City General Services Office',
    'City Health Office',
    'City Legal Office',
    "City Mayor's Office",
    'City Planning and Development Office',
    'City Public Safety Office',
    'City Social Welfare & Development Office',
    "City Treasurer's Office",
    'City Veterinary Office',
    "City Vice-Mayor's Office",
    'DepEd - Bayawan East Central School',
    'DepEd - Bayawan National High School',
    'Information Technology Office',
    'Internal Audit Services Section',
    'Local Disaster and Risk Reduction Management Office',
    'Media Bureau',
    'National Agencies',
    'Office of the Human Resource Management and Development',
    'Office of the Secretary to the Sangguniang Panglungsod',
    'Public Market & Slaughterhouse',
    'Sangguniang Panglungsod',
];
