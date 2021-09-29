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
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { AuthRouter } from "./AuthRouter";
import {  getAuth,onAuthStateChanged } from "firebase/auth";
import { loginSincrono } from "../Actions/actionLogin";


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
    return (
        <Router>
            <Switch>
                <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={isLooggedIn}
                />

                <PrivateRoute
                    exact
                    path="/"
                    component={Home}
                    isAuthenticated={isLooggedIn}
                />
            </Switch>
        </Router>
    )
}
