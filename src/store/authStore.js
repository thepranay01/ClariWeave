import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Mock login
        // In a real app, verify with backend/Firebase
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password) {
              const mockUser = {
                id: "u1",
                name: email.split("@")[0],
                email: email,
                avatar: null,
              };
              set({ user: mockUser, isAuthenticated: true });
              resolve(mockUser);
            } else {
              reject(new Error("Invalid credentials"));
            }
          }, 500);
        });
      },

      register: async (name, email, password) => {
        // Mock register
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password && name) {
              const newUser = {
                id: "u" + Date.now(),
                name,
                email,
                avatar: null,
              };
              set({ user: newUser, isAuthenticated: true });
              resolve(newUser);
            } else {
              reject(new Error("Missing fields"));
            }
          }, 500);
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: { ...state.user, ...data },
        }));
      },
    }),
    {
      name: "clariweave-auth", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useAuthStore;
