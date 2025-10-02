export type UserStatus = "active" | "inactive" | "pending";

export type UserRole = 'Super Admin' | 'Admin' | 'Manager' | 'Seller' | 'Delivery Agent' | 'Customer';

export type UserFilters = {
    status?: UserStatus[],
    role?: UserRole[],
    name?: string
}