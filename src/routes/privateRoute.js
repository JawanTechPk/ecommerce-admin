import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const data = localStorage.getItem("adminData");
    return (
        <Route
            {...rest}
            render={(props) =>
                data ? (children) : <Redirect to="/" />
            }
        />
    );
};

const PublicRoute = ({ children, ...rest }) => {
    const data = localStorage.getItem("adminData");
    return (
        <Route
            {...rest}
            render={(props) =>
                !data ? (children) : <Redirect to="/Home" />
            }
        />
    );
};

export  {PrivateRoute,PublicRoute};