export type Status = 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';

export type Order = {
    id: number;
    user_fullname: string;
    address: string;
    date: string;
    status: Status;
};

export type OrderFilters = {
    status?: Status[];
    date?: string[];
    page?: number;
}