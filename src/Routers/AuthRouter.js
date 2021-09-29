import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Pages/Login';

export const  AuthRouter =()=> {
    return (
        <Switch>
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/register' component={Login} />
            <Redirect to="/auth/login"/>
        </Switch>
    )
}
