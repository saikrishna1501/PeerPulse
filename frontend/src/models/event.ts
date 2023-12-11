export interface Event {
    id: string;
    title: string;
    organizer: string;
    description: string;
    location: string;
    date: string;
    categories: string[];
    imageUrl: string;
    latitude: number;
    longitude: number;
    isPaid: boolean
}