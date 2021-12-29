import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash";
import { useSelector } from "react-redux";

import { axiosBaseConfig } from "./utils";
import { AuthRoutes, MainRoutes } from "./navigations";
import { PrivateRoute } from "components";
import { authSelector } from "store/slices/auth/authSlice";

import "./App.css";

function App() {
  useEffect(() => {
    axiosBaseConfig();
  }, []);

  const { token } = useSelector(authSelector);

  return (
    <Router>
      <Routes>
        {map(AuthRoutes, (item) => (
          <Route
            path={item.path}
            key={item.path}
            element={<item.Component />}
          />
        ))}
        {map(MainRoutes, (item) => (
          <Route
            path={item.path}
            key={item.path}
            element={
              <PrivateRoute
                component={item.Component}
                token={token != null && token !== ""}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
