import React, { Component } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';

var user = {
    name: Cookies.get("__hrnu"),
    image: Cookies.get("__hrui")
}

class HeaderLinks extends Component {
    logOut() {
        Cookies.remove('__hrid', { path: '/' })
        Cookies.remove('__hrnu', { path: '/' })
        Cookies.remove('__hrni', { path: '/' })
        Cookies.remove('__hrui', { path: '/' })

        var filter = {
            year: "all",
            type: "all",
            quarter: "all",
            month: "all",
            daily: "month"
        }
        var authOptions = {
            method: 'POST',
            url: 'http://0.0.0.0:8080/nonopsform/filter',
            data: JSON.stringify(filter),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        };
        axios(authOptions)
            .then(function (response) {
                console.log(response.status, "success");
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.href = "/register"
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Nav>
                    <NavDropdown eventKey={1} title={
                        <span><img aria-hidden id="profil-picture" src={user.image} alt="profil picture" width="40" />{user.name}</span>
                    } id="basic-nav-dropdown">
                        {/* <MenuItem divider /> */}
                        <MenuItem eventKey={1.1} onClick={this.logOut}>Log out</MenuItem>
                    </NavDropdown>
                </Nav>   
            </div >
        );
    }
}

export default HeaderLinks;
