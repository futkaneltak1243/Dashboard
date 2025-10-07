export type UserStatus = "active" | "inactive" | "pending";

export type UserRole = 'Super Admin' | 'Admin' | 'Manager' | 'Seller' | 'Delivery Agent' | 'Customer';

export interface User {
    id: number;
    fullname: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar: string | "null";
    password: string;
}


export type UserFilters = {
    status?: UserStatus[],
    role?: UserRole[],
    name?: string,
    page?: number
}