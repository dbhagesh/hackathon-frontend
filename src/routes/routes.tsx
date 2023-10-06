import Home from "../Components/Home";
import { routePaths } from "../constants/route-constants";
import { TRoute } from "../types/common";

export const routes: TRoute[] = [
  {
    path: routePaths.home,
    component: <Home />,
    pageName: "home",
    shortPageName: "home",
  },
];
