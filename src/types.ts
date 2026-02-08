export interface Location {
    address: string;
    city: string;
    district: string;
    lat?: number;
    lng?: number;
}

export interface Features {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking?: number;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: 'USD' | 'PEN';
    type: 'sale' | 'rent';
    category: 'apartment' | 'house' | 'office' | 'land';
    location: Location;
    features: Features;
    images: string[];
    publisherId: string;
    createdAt: string;
    status: 'pending' | 'verified' | 'rejected' | 'reported';
    plan: 'free' | 'featured' | 'premium';
    isVerified: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'agent' | 'admin';
    avatar?: string;
}
