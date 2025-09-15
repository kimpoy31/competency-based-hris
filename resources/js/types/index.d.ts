export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
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
