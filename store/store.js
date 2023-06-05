import create from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist((set, get) => ({
    isAuthenticated: false,
    toggleIsAuthenticated: (val) => set(() => ({ isAuthenticated: val })),
  }))
);

export default useAuthStore;
