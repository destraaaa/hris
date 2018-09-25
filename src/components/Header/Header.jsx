import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import HeaderLinks from './HeaderLinks.jsx';
import appRoutes from 'routes/app.jsx';

const $ = require('jquery');

class Header extends Component {
    constructor(props) {
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false
        };
    }

    componentDidMount() {
        $(".navbar-container").css("width",this.sizeHandle());        
        $(window).resize(function () {
            let widthNavbar = ($(window).width()) - 258
            if ($(window).width() >= 990) {
                $(".navbar-container").width(widthNavbar);
            }
            else{
                $(".navbar-container").css("width","100%");
            }
        });
    }

    sizeHandle(){
        if ($(window).width() >= 990) {
            return window.innerWidth - 260
        }
        else{
            return "100%"
        }
    }

    mobileSidebarToggle(e) {
        if (this.state.sidebarExists === false) {
            this.setState({
                sidebarExists: true
            });

        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        var node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }
    getBrand() {
        var name;
        appRoutes.map((prop, key) => {
            if (prop.collapse) {
                prop.views.map((prop, key) => {
                    if (prop.path === this.props.location.pathname) {
                        name = prop.name;
                    }
                    return null;
                })
            } else {
                if (prop.redirect) {
                    if (prop.path === this.props.location.pathname) {
                        name = prop.name;
                    }
                } else {
                    if (prop.path === this.props.location.pathname) {
                        name = prop.name;
                    }
                }
            }
            return null;
        })
        return name;
    }
    render() {
        return (
            
            <Navbar fluid style={{ zIndex: 999, position: "fixed" }} className="navbar-container">
                <Navbar.Header style={{ marginLeft: 20 }}>
                    <Navbar.Brand pullLeft>
                        <span>{this.getBrand()}</span>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>
                <Navbar.Collapse>
                    <HeaderLinks />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
