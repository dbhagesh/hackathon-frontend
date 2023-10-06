import {
  Context,
  createContext,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { initialState } from "./initialState";
import reducer from "./reducer";
import { TGlobalStoreState } from "./types";

const StoreContext: Context<TGlobalStoreState> = createContext({
  ...initialState,
});

type TProps = {
  children: ReactNode;
};

export const GlobalStoreProvider: FC<TProps> = (props: TProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // =====================================================================================================================================//
  return (
    <StoreContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export const useGlobalStore = () => useContext(StoreContext);
