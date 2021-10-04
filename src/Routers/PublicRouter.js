import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import BarraNavegacion from "../Components/BarraNavegacion";
import BarraSec from '../Components/BarraSec';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const login = false
    return (

        <>
            <BarraNavegacion login={(isAuthenticated)?true:false} />
            <BarraSec/>
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