import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import InputSearch from "../inputSearch/InputSearch";
import { publicRoutes, privateRoutes } from "../routes-component/Routes";
const Navigation: React.FC = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route: any) => (
          <Route
            path={route.pathsPublic}
            element={route.element}
            key={route.pathsPublic}
          />
        ))}
        <Route path="/YoutubeSPA" element={<HomePage />}>
          <Route index element={<InputSearch />} />
          {privateRoutes.map((route: any) => (
            <Route
              path={route.pathsPrivate}
              element={route.element}
              key={route.pathsPrivate}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
