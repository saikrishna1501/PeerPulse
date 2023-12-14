export interface Housing {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    imageUrl: string;
    latitude: number;
    longitude: number;
    beds: number;
    type: string;
    amenities1: string;
    amenities2: string;
    amenities3: string;
    amenities4: string;
    images: [];
}