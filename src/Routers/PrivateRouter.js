import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import BarraNavegacion from "../Components/BarraNavegacion";
import BarraSec from '../Components/BarraSec';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <div>

            <BarraNavegacion
                login={(isAuthenticated)?true:false}
            />
            <BarraSec/>
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