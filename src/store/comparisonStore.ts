import { create } from 'zustand';
import { Property } from '../types';

interface ComparisonState {
    compareList: Property[];
    addToCompare: (property: Property) => void;
    removeFromCompare: (propertyId: string) => void;
    clearCompare: () => void;
    isComparing: (propertyId: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
    compareList: [],
    addToCompare: (property) => {
        const { compareList } = get();
        if (compareList.length < 3 && !compareList.find(p => p.id === property.id)) {
            set({ compareList: [...compareList, property] });
        }
    },
    removeFromCompare: (propertyId) => {
        set({ compareList: get().compareList.filter(p => p.id !== propertyId) });
    },
    clearCompare: () => set({ compareList: [] }),
    isComparing: (propertyId) => get().compareList.some(p => p.id === propertyId),
}));
