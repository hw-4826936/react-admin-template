import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  role?: string;
}

interface UserState {
  token: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  permissions: string[];
  setToken: (token: string, refreshToken: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  setPermissions: (permissions: string[]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      userInfo: null,
      permissions: [],
      setToken: (token, refreshToken) => set({ token, refreshToken }),
      setUserInfo: (userInfo) => set({ userInfo }),
      setPermissions: (permissions) => set({ permissions }),
      logout: () => set({ token: null, refreshToken: null, userInfo: null, permissions: [] }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
