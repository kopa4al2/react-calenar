import React from 'react';
import {AuthenticationContext} from "../ContextHolder";
import Route from "react-router-dom/es/Route";

export const ContextToPropsHOC = (InnerComponent) => (props) => {
    return (<AuthenticationContext.Consumer>
        {context =>
            context.isLoggedIn === null ?
                ""
                :
                <InnerComponent context={context} {...props}/>
        }
    </AuthenticationContext.Consumer>)
};

export const RouteToContextHOC = (InnerComponent) => (props) => {
    return (<Route>
        {routeProps =>
            <InnerComponent route={routeProps} {...props}/>
        }
    </Route>)
};