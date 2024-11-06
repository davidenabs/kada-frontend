import { IUser } from "@/interface/user";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface UserState {
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

export const userAtom = atomWithStorage("kada-user", defaultUser, undefined, {
  getOnInit: true,
});

export const clearUserAtom = atom(null, (_get, set) => {
  return set(userAtom, defaultUser);
});
