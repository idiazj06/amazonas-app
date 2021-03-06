import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


import Home from "../Pages/Home";
import AgregarProductos from "../Pages/AgregarProductos";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { AuthRouter } from "./AuthRouter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginSincrono } from "../Actions/actionLogin";
import Products from "../Pages/Products";
import Details from "../Pages/Details";
import Loading from "../Components/Loading";


export default function AppRouter() {
    const auth = getAuth();
    const [checking, setChecking] = useState(true)
    const [isLooggedIn, setsIsLoogedIn] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch(loginSincrono(user.uid, user.displayName))
                setsIsLoogedIn(true)
                // dispatch(Listar(user.uid))
                console.log(user.uid)
            } else {
                setsIsLoogedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking])

    if (checking) {
        return <Loading/>;
    }
    return (
        <Router>

            <Switch>
                <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={isLooggedIn}
                />

                <PrivateRoute
                    path="/addprod"
                    component={AgregarProductos}
                    exact
                    isAuthenticated={isLooggedIn}
                />
                <PrivateRoute
                    path="/details"
                    component={Details}
                    isAuthenticated={isLooggedIn}
                />
                <PrivateRoute
                    path="/products"
                    component={Products}
                    isAuthenticated={isLooggedIn}
                />


                <Redirect to="/products" />

            </Switch>
        </Router>
    )
}
