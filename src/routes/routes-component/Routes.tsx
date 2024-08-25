import { pathsPublic, pathsPrivate } from "../paths-component/paths";
import Login from "../../pages/FormLogin/FormLogin";
import { Navigate } from "react-router-dom";

import SavedRequests from "../../pages/SavedRequests/SavedRequests";
import InputSearch from "../../components/inputSearch/InputSearch";

export const publicRoutes = [
  {
    pathsPublic: pathsPublic.Starting,
    element: <Navigate to={pathsPublic.Login} replace />,
  },
  { pathsPublic: pathsPublic.Login, element: <Login /> },
];

export const privateRoutes = [
  { pathsPrivate: pathsPrivate.SearchVideo, element: <InputSearch /> },
  { pathsPrivate: pathsPrivate.SavedRequests, element: <SavedRequests /> },
];
