/* global gapi */
import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem, Popover, OverlayTrigger } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Dashboard from '../../views/Dashboard/Dashboard';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

var name = {
    userName: Cookies.get("__hrnu")
}

const popoverYear = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per years data
    </Popover>
);
const popoverType = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per Type Candidate data
    </Popover>
);
const popoverQ = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per Quarter data
    </Popover>
);
const popoverD = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per Month Quarter data
    </Popover>
);

const popoverW = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per Daily data
    </Popover>
)

const year = parseInt(new Date().getFullYear());


class HeaderLinks extends Component {
    constructor() {
        super();
        this.state = {
            years: "all",
            type: "all",
            daily: "quarter",
            quarter: "all",
            month: "all"

        }
        this.change = this.change.bind(this);
        this.resetQ = this.resetQ.bind(this);
    }

    // componentWillMount(){

    //     this.setState({
    //         years: Cookies.get('year'),
    //         type: Cookies.get('type'),
    //         quarter: Cookies.get('quarter'),
    //         month: Cookies.get('month'),
    //         daily: Cookies.get('daily')
    //     })
    // }


    submit(e) {
        e.preventDefault();
        let filter = {
            year: this.state.years,
            type: this.state.type,
            quarter: this.state.quarter,
            month: this.state.month,
            daily: this.state.daily
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
                console.log(response.data);
                console.log(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });

            if(window.parent.location.href === "http://localhost:3000/dashboard")
            this.props.history.push("/");
            if(window.parent.location.href === "http://localhost:3000/NonOps_Form_Response")
            this.props.history.push("/NonOps_Form_Response");
            if(window.parent.location.href === "http://localhost:3000/Ops_Form_Response")
            this.props.history.push("/Ops_Form_Response");
            // window.parent.location = window.parent.location.href;
            // this.setState({
            //     years: Cookies.get('year'),
            //     type: Cookies.get('type'),
            //     daily: Cookies.get('quarter'),
            //     quarter: Cookies.get('month'),
            //     month: Cookies.get('daily')
            // })

        // window.location.href = "/dashboard"


        // years: Cookies.get('year'),
        // type:   Cookies.get('type'),
        // daily:  Cookies.get('quarter'),
        // quarter: Cookies.get('month'),
        // month:   Cookies.get('daily')
        // year: Cookies.set('year',this.state.years,{ expires: 1 }),
        // type: Cookies.set('type',this.state.type,{ expires: 1 }),
        // quarter:  Cookies.set('quarter',this.state.quarter,{ expires: 1 }),
        // month: Cookies.set('month',this.state.month,{ expires: 1 }),
        // daily:  Cookies.set('daily',this.state.daily,{ expires: 1 }), 





    }


    logOut() {

        Cookies.remove('__hrid', { path: '/' })
        Cookies.remove('__hrnu', { path: '/' })
        // window.location.href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/register"
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
                console.log(response.data);
                console.log(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.location.href = "/register"

    }

    yearly() {
        var arr = []
        for (let i = 2018; i <= year; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }

        return arr;
    }

    quarterly() {
        var arr = [];
        let today = new Date();
        let quarter = Math.floor((today.getMonth() + 3) / 3);
        var date = ["(Jan-Mar)", "(Apr-Jun)", "(Jul-Sep)", "(Oct-Des)"]
        if (this.state.years === "all" || this.state.years != year.toString()) {
            for (let i = 1; i <= 4; i++) {
                arr.push(<option key={i} value={i}>
                    Q{i} {date[i - 1]}</option>)
            }
        }
        else
            for (let i = 1; i <= quarter; i++) {
                arr.push(<option key={i} value={i}>Q{i} {date[i - 1]}</option>)
            }

        return arr;
    }

    monthly() {
        var arr = [];
        let today = new Date();
        let quarter = (Math.floor((today.getMonth() + 3) / 3)).toString();
        const day = parseInt(new Date().getMonth());
        var date = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Des"]
        let check = null;

        if (this.state.quarter === "1")
            check = this.state.quarter === quarter && this.state.years != "all" ? (day + 1) : 3
        for (let i = 1; i <= check; i++) {
            arr.push(<option key={i} value={i}>
                {date[i - 1]}</option>)
        }
        if (this.state.quarter === "2") {
            check = this.state.quarter === quarter && this.state.years != "all" ? (day + 1) : 6
            for (let i = 4; i <= check; i++) {
                arr.push(<option key={i} value={i}>
                    {date[i - 1]}</option>)
            }
        }
        if (this.state.quarter === "3") {
            check = this.state.quarter === quarter && this.state.years != "all" ? (day + 1) : 9
            for (let i = 7; i <= check; i++) {
                arr.push(<option key={i} value={i}>
                    {date[i - 1]}</option>)
            }
        }
        if (this.state.quarter === "4") {
            check = this.state.quarter === quarter && this.state.years != "all" ? (day + 1) : 12
            for (let i = 10; i <= check; i++) {
                arr.push(<option key={i} value={i}>
                    {date[i - 1]}</option>)
            }
        }
        return arr;
    }



    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    resetQ() {
        if (this.state.daily != "quarter") {
            this.setState({
                quarter: "all",
                month: "all"
            });
        }
    }



    render() {
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        console.log(...this.props)
        return (


            <div>
                {/* this is the icon Header ..............................................*/}
                <Nav>
                    {/* <NavDropdown eventKey={1} title={notification} noCaret id="basic-nav-dropdown">
                        <MenuItem eventKey={1.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={1.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={1.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={1.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={1.5}>Another notifications</MenuItem>
                    </NavDropdown> */}
                    <NavItem eventKey={2} id="navitem">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverYear}>
                            <select name="years" id="navbarYear" onChange={e => this.change(e)}>
                                <option value="all">All</option>
                                {this.yearly()}
                            </select>
                        </OverlayTrigger>
                    </NavItem>
                    <NavItem eventKey={3} id="navitem">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverType}>
                            <select name="type" id="navbarType" onChange={e => this.change(e)}>
                                <option value="all">All</option>
                                <option value="Non Operational Form">Nonops</option>
                                <option value="Operational Form">Ops</option>
                            </select>
                        </OverlayTrigger>
                    </NavItem>
                    <NavItem eventKey={4} id="navitem">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverW}>
                            <select name="daily" id="navbarType" onChange={e => this.change(e)} onClick={this.resetQ}>
                                <option value="quarter">Quarter</option>
                                <option value="week" >Weeks</option>
                                <option value="day">Today</option>

                            </select>
                        </OverlayTrigger>
                    </NavItem>
                    <NavItem eventKey={5} id="navItemQ">
                        <div style={{ display: this.state.daily != "quarter" ? "none" : "block" }}>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverQ}>
                                <select name="quarter" id="navbarQ" onChange={e => this.change(e)}>
                                    <option value="all">All</option>
                                    {this.quarterly()}
                                </select>
                            </OverlayTrigger>
                        </div>
                    </NavItem>
                    <NavItem eventKey={5} id="navitem">
                        <div style={{ display: this.state.quarter != "all" ? this.state.daily != "quarter" ? "none" : "block" : "none" }}>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverD}>
                                <select name="month" id="navbarM" onChange={e => this.change(e)}>
                                    <option value="all">All</option>
                                    {this.monthly()}
                                </select>
                            </OverlayTrigger>
                        </div>
                    </NavItem>
                    {/* <NavItem eventKey={6} id="navitem">
                        <div style={{ display: this.state.month === "all" || this.state.quarter === "all" ? "none" : "block" }}>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverW}>
                                <select name="daily" id="navbarYear" value={this.state.purpose} onChange={e => this.change(e)}>
                                    <option value="month">Month</option>
                                    <option value="week">Weeks</option>
                                    <option value="day">Today</option>
                                </select>
                            </OverlayTrigger>
                        </div>
                    </NavItem> */}
                    <NavItem eventKey={7} style={{
                        position: "relative",
                        right: this.state.daily != "quarter" ? 240 : this.state.daily != "quarter" ? 110 : this.state.quarter === "all" ? 100 : 0
                    }}>
                        <button type="button" onClick={e => this.submit(e)} className="btn" id="navbutton">Filter</button>
                    </NavItem>


                </Nav>
                {/* this is the icon Header ..............................................*/}
                <Nav pullRight>
                    <NavItem eventKey={1}>{name.userName}</NavItem>
                    {/* <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.1}>Action</MenuItem>
                        <MenuItem eventKey={2.2}>Another action</MenuItem>
                        <MenuItem eventKey={2.3}>Something</MenuItem>
                        <MenuItem eventKey={2.4}>Another action</MenuItem>
                        <MenuItem eventKey={2.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.5}>Separated link</MenuItem>
                    </NavDropdown> */}
                    {/* <NavItem eventKey={3} 
                    href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/register">Log out</NavItem> */}

                    {/* <NavItem eventKey={3}>
                        <GoogleLogout 
                            buttonText="Log out"
                            onLogoutSuccess={logout}>
                        </GoogleLogout>
                    </NavItem> */}
                    <NavItem eventKey={2} onClick={this.logOut}>Log out</NavItem>
                </Nav>
                {console.log(this.state)}
            </div >
        );
    }
}

export default withRouter(HeaderLinks);
