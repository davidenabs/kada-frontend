import { IUser } from "@/interface/user";
import { decryptData, encryptData } from "@/utils/utils";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface UserState {
  user: IUser | null;
  token: string | null;
  role: string | null;
  authenticated: boolean;
  language: string | null;
}

export const defaultUser: UserState = {
  user: null,
  token: null,
  role: null,
  authenticated: false,
  language: null,
};

// Encrypted storage adapter
const encryptedStorage = {
  getItem: (key: string) => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    try {
      const decryptedData = decryptData(encryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      return null;
    }
  },
  setItem: (key: string, newValue: UserState) => {
    const dataString = JSON.stringify(newValue);
    const encryptedData = encryptData(dataString);
    localStorage.setItem(key, encryptedData);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

// export const userAtom = atomWithStorage("kada-user", defaultUser, undefined, {
//   getOnInit: true,
// });

export const userAtom = atomWithStorage(
  "kada-user",
  defaultUser,
  encryptedStorage
);

export const clearUserAtom = atom(null, (_get, set) => {
  return set(userAtom, defaultUser);
});
