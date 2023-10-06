/* eslint-disable no-use-before-define */
import { TAnyOrNone } from "../../types/common";
export type TGlobalActionType = "UPDATE_STATE" | "CHANGE_ALERT";

export type TGlobalAction = {
  type: TGlobalActionType;
  payload?: TAnyOrNone<TGlobalStoreState>;
};
export type TFunction = () => void;
export type TLoggedUser = {
  id: string;
  name: string;
};

export type TGlobalStoreState = {
  pageName?: string;
  dispatch: React.Dispatch<TGlobalAction> | TFunction;
  isAppMounted: boolean;
  isLoggedIn: TLoggedUser | null;
};
