import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import BarraNavegacion from "../Components/BarraNavegacion";

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <div>
            <BarraNavegacion />
            <Route {...rest}
                component={(props) => (
                    (isAuthenticated)
                        ? (<Component {...props} />)
                        : (<Redirect to="/auth/login" />)
                )}
            />
        </div>
    )
}
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}