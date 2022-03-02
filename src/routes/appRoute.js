import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../screens/login/login";
import Home from "../screens/home/home";
import EditAd from "../screens/editad/editad";
import EditCategory from "../screens/editCategory/editCategory";
import Reassignad from "../screens/reAssignAd/reAssignAd";
import { PrivateRoute, PublicRoute } from "./privateRoute";
import AdminChatApp from "../screens/chatApp/adminChatApp";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/">
          <Login />
        </PublicRoute>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/editcategory">
          <EditCategory />
        </PrivateRoute>
        <PrivateRoute exact path="/editad">
          <EditAd />
        </PrivateRoute>
        <PrivateRoute exact path="/reassignad">
          <Reassignad />
        </PrivateRoute>
        <PrivateRoute exact path="/chatapp">
          <AdminChatApp />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
