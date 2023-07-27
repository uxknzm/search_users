import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { privateRoutes, publicRoutes } from "./utils/Route";

const AppRouter = () => {
  const auth = false;
  return auth ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={"/home"} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={"/home"} />} />
    </Routes>
  );
};

export default AppRouter;
