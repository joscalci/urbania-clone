import { create } from 'zustand';
import { Property } from '../types';

interface PropertyState {
    properties: Property[];
    addProperty: (property: Property) => void;
    removeProperty: (id: string) => void;
    getUserProperties: (userId: string) => Property[];
}

// Mock initial data
const initialProperties: Property[] = [
    {
        id: '1',
        title: 'Moderno Departamento en Miraflores',
        description: 'Hermoso departamento con vista al mar, cerca a Larcomar.',
        price: 250000,
        currency: 'USD',
        type: 'sale',
        category: 'apartment',
        location: {
            address: 'Av. Larco 123',
            city: 'Lima',
            district: 'Miraflores',
        },
        features: {
            bedrooms: 3,
            bathrooms: 2,
            area: 120,
            parking: 1,
        },
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'],
        publisherId: '1', // Matches mock user ID
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Casa de Playa en Asia',
        description: 'Casa amplia con piscina y zona de parrilla.',
        price: 3500,
        currency: 'USD',
        type: 'rent',
        category: 'house',
        location: {
            address: 'Condominio Las Palmas',
            city: 'Cañete',
            district: 'Asia',
        },
        features: {
            bedrooms: 5,
            bathrooms: 4,
            area: 300,
            parking: 3,
        },
        images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'],
        publisherId: '1',
        createdAt: new Date().toISOString(),
    }
];

export const usePropertyStore = create<PropertyState>((set, get) => ({
    properties: initialProperties,
    addProperty: (property) => set((state) => ({ properties: [...state.properties, property] })),
    removeProperty: (id) => set((state) => ({ properties: state.properties.filter((p) => p.id !== id) })),
    getUserProperties: (userId) => get().properties.filter((p) => p.publisherId === userId),
}));
