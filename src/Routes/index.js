import React, { useEffect, useState } from "react";
import { Routes, Route, redirect } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

//constants
import { layoutTypes } from "../constants/layout";

// layouts
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import HorizontalLayout from "../Layout/HorizontalLayout/index";
import { AuthProtected } from "./AuthProtected";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { authProtectedRoutes, publicRoutes } from "./routes";

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const Index = () => {
  const navigate = useNavigate();

  const { layoutType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));

  const Layout = getLayout(layoutType);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const openToken = jwtDecode(token);
      if (
        openToken.email === process.env.REACT_APP_ENTERING &&
        openToken.password === process.env.REACT_APP_PASSWORD
      ) {
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AuthProtected>
                <Layout>{route.component}</Layout>
              </AuthProtected>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Route>

      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Index;
