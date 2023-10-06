import { Route, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
import AppContainer from "../AppContainer";
import { Community } from "../Components/Community";
import Home from "../Components/Home";
import { QuestionList } from "../Components/Question";
import { Room } from "../Components/Room";
import Question from "../Components/Room/Question";
import { UserLoginModal } from "../Components/User";
import PrivateOutlet from "../PrivateOutlet";
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

export const useRouter = () => {
  return createBrowserRouter(
    createRoutesFromChildren(
      <Route path = "/" element={<AppContainer />} >
        <Route path="/login" element={<UserLoginModal />} />
          <Route path = "/" element={<PrivateOutlet />} >
            <Route path="/home" element={<Home />}>
              <Route path="questions" element={<QuestionList />} />
              <Route path="community/:id" element={<Community />} />
            </Route>
          </Route>
        <Route path="/room/:id" element={<Room />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="*" element={<> Login first </>} />
      </Route>
    )
    )
}