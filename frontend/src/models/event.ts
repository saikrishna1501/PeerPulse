export interface Event {
    _id: string;
    title: string;
    organizer: string;
    description: string;
    location: string;
    date: string;
    categories: string[];
    creatorId: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    isPaid: boolean;
    type: string
}

export enum RegistrationStatus {
    REGISTERED,
    NOT_REGISTERED,
    CANT_REGISTER
}