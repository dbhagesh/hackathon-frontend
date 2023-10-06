import { TGlobalStoreState } from "./types";

export const initialState: TGlobalStoreState = {
  pageName: "default",
  dispatch: () => null,
  isAppMounted: false,
  isLoggedIn: null,
  currentRoom: null,
};
