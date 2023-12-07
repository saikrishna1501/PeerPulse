export interface Event {
    id: string;
    name: string;
    organizer: string;
    description: string;
    location: string;
    date: string;
    categories: string[];
    imageUrl: string;
    latitude: number;
    longitude: number;
}