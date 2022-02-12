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

export default PrivateRoute;