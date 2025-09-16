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

export interface User {
    id: number;
    username: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    roles: Role[];
    // [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: RoleName;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    users?: User[]; // 👈 many-to-many inverse
    pivot?: {
        user_id: number;
        role_id: number;
        created_at: string;
        updated_at: string;
    };
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
    user_id: number;
    job_family_id: number;
    name: string;
    status: 'active' | 'inactive';
    created_by_role: RoleName;
    job_family?: JobFamily;
    user?: User;
}
