import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import BarraNavegacion from "../Components/BarraNavegacion";

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (

        <>
            <BarraNavegacion />
            <Route {...rest}
                component={(props) => (
                    (isAuthenticated)
                        ? (<Redirect to="/" />)
                        : (<Component {...props} />)
                )}
            />
        </>
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}