export type Status = 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';

export type OrderProduct = {
    name: string;
    price: number
}

export type Order = {
    id: number;
    user_fullname: string;
    address: string;
    date: string;
    status: Status;
    user_email: string;
    total: number;
    products: OrderProduct[]
};

export type OrderFilters = {
    status?: Status[];
    date?: string[];
    page?: number;
}