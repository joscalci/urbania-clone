export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: 'USD' | 'PEN';
    type: 'sale' | 'rent';
    category: 'apartment' | 'house' | 'office' | 'land';
    location: {
        address: string;
        city: string;
        district: string;
        lat?: number;
        lng?: number;
    };
    features: {
        bedrooms: number;
        bathrooms: number;
        area: number; // m2
        parking: number;
    };
    images: string[];
    publisherId: string;
    createdAt: string;
}
