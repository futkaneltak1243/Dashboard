export type ExhibitionStatus = "Upcoming" | "Ongoing" | "Completed" | "Planned"

export type Exhibition = {
    id: number;
    name: string;
    title: string;
    location: string;
    organizer: string;
    start_date: string;
    end_date: string;
    status: ExhibitionStatus;
    capacity: number;
}

export type ExhibitionFilters = {
    title?: string;
    page?: number;
}