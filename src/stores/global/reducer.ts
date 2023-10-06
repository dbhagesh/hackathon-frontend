import { Reducer } from "react";
import { TGlobalAction, TGlobalStoreState } from "./types";
import { initialState } from "./initialState";

const reducer: Reducer<TGlobalStoreState, TGlobalAction> = (
  state: TGlobalStoreState = initialState,
  action: TGlobalAction
): TGlobalStoreState => {
  switch (action.type) {
    case "UPDATE_STATE":
      return {
        ...state,
        ...action.payload,
      };
  }

  return state;
};

export default reducer;
