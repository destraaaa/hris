import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import App from 'containers/App/App.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/sass/dashboardEdit.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/index.css';
import './assets/css/datatable.css';
import './assets/css/survey.css';
import 'assets/css/flip.css';
import Cookies from 'js-cookie';
import Main from './Main';
import Admin from './RegistPage/Admin';

const Auth = {
    isAuthenticated: Cookies.get("__hrid")

};

const RPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (Auth.isAuthenticated != null ? (
                (

                    <Component {...props} />
                )
            ) : (
                
                    <Redirect
                        to={{
                            pathname: "/register",
                            state: { from: props.location }
                        }}
                    />
                ))
        }
    />

);

const DPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (!Auth.isAuthenticated ? (
                (

                    <Component {...props} />
                )
            ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: props.location }
                        }}
                    />
                ))
        }
    />
);

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <DPrivateRoute path="/adminHR" name="admin" component = {Admin} />
            <DPrivateRoute path="/register" name="register" component={Main} />
            <RPrivateRoute path="/" name="Home" component={App} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));


