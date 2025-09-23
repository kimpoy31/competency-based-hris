export interface SpmsEmployee {
    employees_id: number;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    status: 'ACTIVE' | 'INACTIVE' | null;
    spms_user?: SpmsUser;
}

export interface SpmsUser {
    acc_id: number;
    employees_id: number;
    username: string;
    spms_employee?: SpmsEmployee;
}
