export type Product = {
    id: number;
    images: string;
    name: string;
    price: number;
    isfavorite: 1 | 0;
};

export type ProductFilters = {
    name?: string;
    page?: number;
}