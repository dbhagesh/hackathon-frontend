/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef } from "react";
import { RouterProvider } from "react-router-dom";
import { TPageName, TRoute } from "../types/common";
import { generatePageUID } from "../utils/helpers/helper";
import { useRouter } from "./routes";

const RouteController: FC = () => {
  const currentPageName = useRef<TPageName>();
  const onPathRender = (route: TRoute): any => {
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
  const router = useRouter();
  return <RouterProvider router={router} />
};
export default RouteController;
