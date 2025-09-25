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
    personal_data_sheet?: PersonalDataSheet;
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
    definition: string;
    deleted_at?: string | null;
    source: Source;
    job_family?: JobFamily;
    user?: User;
    behavioral_indicators?: BehavioralIndicator[];
}

export interface BehavioralIndicator {
    id: number;
    user_id: number | null;
    proficiency_level_id: number;
    competency_id: number;
    definition: string;
    order: number;
    source: Source;
    competency?: Competency;
    deleted_at?: string | null;
    user?: User;
    proficiency_level?: ProficiencyLevel;
}

export interface ProficiencyLevel {
    id: number;
    name: string;
    level: number;
    behavioral_indicators?: BehavioralIndicator[];
}

export interface Office {
    id: number;
    name: string;
    alias: string;
    deleted_at?: string | null;
}

export interface PersonalDataSheet {
    id: number;
    office_id: number;
    firstname: string;
    middlename: string | null;
    lastname: string;
    fullname: string;
    user?: User;
    office?: Office;
    deleted_at?: string | null;
}
