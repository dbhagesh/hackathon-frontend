import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./routes/ErrorBoundary";
import Loader from "./routes/loader";
import { useGlobalStore } from "./stores/global";


function AppContainer({children}: any) {
  const { isLoggedIn, dispatch } = useGlobalStore();

  useEffect(() => {
    const localStorageId = localStorage.getItem("id");
    const localStorageName = localStorage.getItem("name");
    if(localStorageId && localStorageName) {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          isLoggedIn: {
            id: localStorageId,
            name: localStorageName,
          },
        },
      });
    }
  }, [])

  return (
    <>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary isFallbackRequired={true}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default AppContainer;
