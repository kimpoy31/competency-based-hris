export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type RoleName = 'super_admin' | 'office_admin' | 'employee';
export type Source = 'system' | RoleName;

export interface User {
    id: number;
    username: string;
    status: 'active' | 'inactive';
    deleted_at?: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
    creator?: User;
    created_users?: User[];
}

export interface Role {
    id: number;
    name: RoleName;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    users?: User[];
    pivot?: {
        user_id: number;
        role_id: number;
        created_at: string;
        updated_at: string;
    };
}

export interface CompetencyType {
    id: number;
    user_id: number | null;
    name: string;
    source: Source;
    deleted_at?: string | null;
    job_families?: JobFamily[];
    user?: User;
}

export interface JobFamily {
    id: number;
    user_id: number | null;
    competency_type_id: number;
    name: string;
    source: Source;
    deleted_at?: string | null;
    competency_type?: CompetencyType;
    competencies?: Competency[];
    user?: User;
}

export interface Competency {
    id: number;
    user_id: number | null;
    job_family_id: number;
    name: string;
    status: 'active' | 'inactive';
    source: Source;
    job_family?: JobFamily;
    user?: User;
}
