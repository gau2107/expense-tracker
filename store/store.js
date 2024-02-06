import create from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist((set, get) => ({
    isAuthenticated: false,
    toggleIsAuthenticated: (val) => set(() => ({ isAuthenticated: val })),
  }))
);

const useCategoryStore = create(
  persist((set, get) => ({
    categories: [],
    setCategories: (arr) => set(() => ({ categories: arr })),
  }))
);

export default useCategoryStore;
