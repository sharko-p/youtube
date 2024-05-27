import { pathsPublic, pathsPrivate } from "../paths-component/paths";
import Login from "../../pages/FormLogin/FormLogin";
import { Navigate } from "react-router-dom";
import HomePages from "../../pages/HomePages/HomePages";
// import ModalWindow from '../ModalWindow/ModalWindow';
// import Registration from "../../pages/FormRegistration/FormRegistration";

export const publicRoutes = [
  {
    pathsPublic: pathsPublic.Starting,
    element: <Navigate to={pathsPublic.Login} replace />,
  },
  { pathsPublic: pathsPublic.Login, element: <Login /> },
  // { pathsPublic: pathsPublic.Registration, element: <Registration /> },
];

export const privateRoutes = [
  { pathsPrivate: pathsPrivate.Search, element: <HomePages /> },
  // { pathsPrivate: pathsPrivate.SaveRequest, element: <ModalWindow/> },
];
