export type PartnerType = "Supplier" | "Distributor" | "Investor" | "Partner";

export type Partner = {
    id: number;
    name: string;
    company: string;
    email: string;
    type: PartnerType;
    joined: string;
}

export type PartnerFilter = {
    page?: number;
    name?: string;
}