import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useGlobalStore } from "./stores/global";


function PrivateOutlet({children}: any) {
  const navigate = useNavigate();
  const { isLoggedIn, dispatch } = useGlobalStore();

  if(isLoggedIn)
    return <Outlet />
  else {
    navigate('/');
    return <></>
  }
}

export default PrivateOutlet;
