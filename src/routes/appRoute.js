import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../screens/login/login';
import Home from '../screens/home/home'
import EditCategory from '../screens/editCategory/editCategory'
import PrivateRoute from './privateRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <PrivateRoute exact path='/home'>
                    <Home />
                </PrivateRoute>
                <PrivateRoute exact path='/editcategory'>
                    <EditCategory />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default AppRoutes
