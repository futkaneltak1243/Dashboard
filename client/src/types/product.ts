export type Product = {
    images: string;
    name: string;
    price: number;
    isfavorites: 1 | 0;
};

export type ProductFilters = {
    name?: string;
    page?: number;
}