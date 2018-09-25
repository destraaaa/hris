import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import { style } from "variables/Variables.jsx";
import appRoutes from 'routes/app.jsx';
import Cookies from 'js-cookie';

var name = {
    username: Cookies.get("__hrnu")
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _notificationSystem: null
        };
    }

    componentDidMount() {
        this.setState({ _notificationSystem: this.refs.notificationSystem });
        var _notificationSystem = this.refs.notificationSystem;
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
        if (window.location.pathname === '/dashboard')
            _notificationSystem.addNotification({
                title: (<span data-notify="icon" className="pe-7s-smile"></span>),
                message: (
                    <div>
                        Welcome back <b>{name.username}</b> to HR Registration Form PT.Tokopedia
                </div>
                ),
                level: level,
                position: "tr",
                autoDismiss: 3,
            });
    }
    componentDidUpdate(e) {
        if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
            document.documentElement.classList.toggle('nav-open');
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <NotificationSystem ref="notificationSystem" style={style} />
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props} />
                        <div style={{ marginTop: 90 }}>
                            <Switch>
                                {
                                    appRoutes.map((prop, key) => {
                                        if (prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.to} key={key} />
                                            );
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key} />
                                        );
                                    })
                                }
                            </Switch>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
