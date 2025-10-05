export type Exhibition = {
    id: number;
    name: string;
    title: string;
    location: string;
    organizer: string;
    dates: string;
    status: "Upcoming" | "Ongoing" | "Completed" | "Planned";
    capacity: number;
}

export type ExhibitionFilters = {
    title?: string;
    page?: number;
}