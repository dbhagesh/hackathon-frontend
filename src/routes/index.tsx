/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Suspense, useRef } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Community from "../Components/Community/Community";
import Home from "../Components/Home";
import { QuestionList } from "../Components/Question";
import { UserLoginModal } from "../Components/User";
import { useGlobalStore } from "../stores/global";
import { TPageName, TRoute } from "../types/common";
import { generatePageUID } from "../utils/helpers/helper";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "./loader";

const RouteController: FC = () => {
  const currentPageName = useRef<TPageName>();
  const _onPathRender = (route: TRoute): any => {
    const { component, pageName, shortPageName = "oth" } = route;

    if (pageName && pageName !== currentPageName.current) {
      if (currentPageName.current) {
        const win = window as any;
        win.recruiterApp = win.recruiterApp || {};
        win.recruiterApp["pageUID"] = `${generatePageUID()}-${shortPageName}`;
        win.nLogger?.addCustomObj({ tag: pageName });
        if (win.nLogger?.startPerformance) {
          win.nLogger?.startPerformance({
            id: pageName,
            shouldReset: true,
          });
        }
      }
      currentPageName.current = (window as any).pageName = pageName;
    }

    return component;
  };

  const { isLoggedIn } = useGlobalStore();
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary isFallbackRequired={true}>
            <Routes>
              <Route path="/login" element={<UserLoginModal />} />
              {isLoggedIn ? (
                <Route path="/home" element={<Home />}>
                  <Route path="questions" element={<QuestionList />} />
                  <Route path="community" element={<Community />} />
                </Route>
              ) : null}
              <Route path="*" element={<> Login first </>} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Router>
    </>
  );
};
export default RouteController;
