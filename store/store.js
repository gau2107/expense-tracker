import create from "zustand";
import { persist } from "zustand/middleware";
const createAuthStore = (set) => ({
  isAuthenticated: false,
  toggleIsAuthenticated: (val) => set(() => ({ isAuthenticated: val })),
});

const createCategoryStore = (set) => ({
  categories: [],
  setCategories: (arr) => set(() => ({ categories: arr })),
});

const createPaymentModeStore = (set) => ({
  paymentModes: [],
  setPaymentModes: (arr) => set(() => ({ paymentModes: arr }))
});


export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthStore(...a),
      ...createCategoryStore(...a),
      ...createPaymentModeStore(...a)
    }),
    {name: 'bound-store'}
  )
)