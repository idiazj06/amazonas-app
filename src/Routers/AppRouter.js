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
        return <h1>Espere...</h1>;
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
                <PublicRoute
                    path="/details"
                    component={Details}
                    isAuthenticated={isLooggedIn}
                />
                <PublicRoute
                    path="/products"
                    component={Products}
                    isAuthenticated={isLooggedIn}
                />
                <PublicRoute
                    path="/"
                    component={Home}
                    exact
                    // isAuthenticated={isLooggedIn}
                />

                
                {/* 
                <PrivateRoute
                    exact
                    path="/"
                    component={''}
                    isAuthenticated={isLooggedIn}
                /> */}


            </Switch>
        </Router>
    )
}
