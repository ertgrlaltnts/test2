import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";


// Import Authentication pages
import Login from "../Pages/Authentication/Login";

// Import Utility Pages
import Maintenance from "../Pages/Utility/Maintenance-Page";
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";

//New
import Add from "../Pages/Add";
import AddVip from "../Pages/Add/ForVip";
import Predictions from "../Pages/Predictions/Predictions";
import Coupons from "../Pages/Predictions/Coupons";
import Vips from "../Pages/Predictions/Vip";
import SingleCoupon from "../Pages/Predictions/SingleCoupon";
import Victorilla from "../Pages/Users/Victorilla";
import Demeter from "../Pages/Users/Demeter";
import Vetdaddy from "../Pages/Users/Vetdaddy";

const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Calender
  { path: "/add", component: <Add /> },
  { path: "/add-vip", component: <AddVip /> },
  { path: "/predictions", component: <Predictions /> },
  { path: "/coupons", component: <Coupons /> },
  { path: "/vip-matches", component: <Vips /> },
  { path: "/edit-coupon/:id", component: <SingleCoupon /> },
  {path:"/users/victorilla" , component:<Victorilla />},
  {path:"/users/demeter" , component:<Demeter />},
  {path:"/users/vetdaddy" , component:<Vetdaddy />}, 


{
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [

  { path: "/login", component: <Login /> },

  // Utility Pages
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
