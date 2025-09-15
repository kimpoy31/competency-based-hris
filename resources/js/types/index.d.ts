export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    username: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    // [key: string]: unknown; // This allows for additional properties...
}

export interface CompetencyType {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    job_families?: JobFamily[];
}

export interface JobFamily {
    id: number;
    competency_type_id: number;
    name: string;
    status: 'active' | 'inactive';
    competency_type?: CompetencyType;
    competencies?: Competency[];
}

export interface Competency {
    id: number;
    job_family_id: number;
    name: string;
    status: 'active' | 'inactive';
    job_family?: JobFamily;
}
