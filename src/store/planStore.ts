import create from 'zustand';

type PlanState = {
    selectedPlan: string | null;
    isPaid: boolean;
    setSelectedPlan: (planId: string | null) => void;
    setPaid: (paid: boolean) => void;
};

export const usePlanStore = create<PlanState>((set) => ({
    selectedPlan: null,
    isPaid: false,
    setSelectedPlan: (planId) => set({ selectedPlan: planId, isPaid: false }), // reset paid when changing plan
    setPaid: (paid) => set({ isPaid: paid }),
}));
