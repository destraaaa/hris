import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import image from 'assets/img/Tokopedia-Regist.jpg';
import logo from 'assets/img/logo1.png';

import appRoutes from 'routes/app.jsx';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions() {
        this.setState({ width: window.innerWidth });
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render() {
        const sidebarBackground = {
            backgroundImage: 'url(' + image + ')'
        };
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={image}>
                <div className="sidebar-background" style={sidebarBackground}></div>
                <div className="logo" style={{ paddingBottom: 75, backgroundColor: "rgba(244, 244, 244, 0.96)", "border-right": "1px solid rgba(0, 0, 0, 0.1)" }}>
                    <a href="https://www.tokopedia.com" target="_blank" rel="noopener noreferrer" className="simple-text logo-mini" >
                        <div className="logo-img" style={{ position: "relative", bottom: 15 }} >
                            <img src={logo} alt="logo_image" style={{ height: 80, width: 210 }} />
                        </div>
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.state.width <= 991 ? (<HeaderLinks />) : null}
                        {
                            appRoutes.map((prop, key) => {
                                if (!prop.redirect)
                                    return (
                                        <li className={prop.upgrade ? "active active-pro" : this.activeRoute(prop.path)} key={key}>
                                            <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                <i className={prop.icon}></i>
                                                <p className="sidebar-text">{prop.name}</p>
                                            </NavLink>
                                        </li>
                                    );
                                return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
