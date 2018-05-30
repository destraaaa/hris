import React, { Component } from 'react';
import { NavItem, Nav, Popover, OverlayTrigger } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

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

const year = parseInt((new Date().getFullYear()),0);


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

        if (window.parent.location.href === "http://localhost:3000/dashboard") {
            this.props.history.push("/");
        }
        if (window.parent.location.href === "http://localhost:3000/NonOps_Form_Response") {
                this.props.history.push('/NonOps_Form_Response')
                Cookies.set('__filt', 'NonOps_Form_Response', { expires: 1, path: '/' })
        }
        if (window.parent.location.href === "http://localhost:3000/Ops_Form_Response") {
                this.props.history.push("/Ops_Form_Response");
                Cookies.set('__filt', 'Ops_Form_Response', { expires: 1, path: '/' })
        }
    }

    logOut() {
        Cookies.remove('__hrid', { path: '/' })
        Cookies.remove('__hrnu', { path: '/' })
        Cookies.remove('__hrni', { path: '/' })        
    
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

        window.location.href = "/register"
    }

    yearly() {
        var arr = []
        for (let i = 2017; i <= year; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }

        return arr;
    }

    quarterly() {
        var arr = [];
        let today = new Date();
        let quarter = Math.floor((today.getMonth() + 3) / 3);
        var date = ["(Jan-Mar)", "(Apr-Jun)", "(Jul-Sep)", "(Oct-Des)"]
        if (this.state.years === "all" || this.state.years !== year.toString()) {
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
        const day = parseInt((new Date().getMonth()),0);
        var date = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Des"]
        let check = null;

        if (this.state.quarter === "1")
            check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 3
        for (let i = 1; i <= check; i++) {
            arr.push(<option key={i} value={i}>
                {date[i - 1]}</option>)
        }
        if (this.state.quarter === "2") {
            check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 6
            for (let i = 4; i <= check; i++) {
                arr.push(<option key={i} value={i}>
                    {date[i - 1]}</option>)
            }
        }
        if (this.state.quarter === "3") {
            check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 9
            for (let i = 7; i <= check; i++) {
                arr.push(<option key={i} value={i}>
                    {date[i - 1]}</option>)
            }
        }
        if (this.state.quarter === "4") {
            check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 12
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
        if (this.state.daily !== "quarter") {
            this.setState({
                quarter: "all",
                month: "all"
            });
        }
        if (this.state.daily !== "all") {
            this.setState({
                month: "all"
            });
        }
    }

    resetY() {
        if (this.state.years !== "all") {
            this.setState({
                quarter: "all",
                month: "all"
            });
        }
    }

    render() {
        return (
            <div>
                {/* this is the icon Header ..............................................*/}
                <Nav>
                    <NavItem eventKey={2} id="navitem">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverYear}>
                            <select name="years" id="navbarYear" onChange={e => this.change(e)} onClick={this.resetY.bind(this)}>
                                <option value="all">All</option>
                                {this.yearly()}
                            </select>
                        </OverlayTrigger>
                    </NavItem>
                    <NavItem eventKey={3} id="navitem">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverType}>
                            <select name="type" id="navbarType" onChange={e => this.change(e)}>
                                <option value="all" >All</option>
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
                        <div style={{ display: this.state.daily !== "quarter" ? "none" : "block" }}>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverQ}>
                                <select name="quarter" value= {this.state.quarter} id="navbarQ" onChange={e => this.change(e)} onClick={this.resetQ}>
                                    <option value="all" >All</option>
                                    {this.quarterly()}
                                </select>
                            </OverlayTrigger>
                        </div>
                    </NavItem>
                    <NavItem eventKey={5} id="navitem">
                        <div style={{ display: this.state.quarter !== "all" ? this.state.daily !== "quarter" ? "none" : "block" : "none" }}>
                            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverD}>
                                <select name="month" id="navbarM" onChange={e => this.change(e)}>
                                    <option value="all">All</option>
                                    {this.monthly()}
                                </select>
                            </OverlayTrigger>
                        </div>
                    </NavItem>
                    <NavItem eventKey={6} style={{
                        position: "relative",
                        right: this.state.daily !== "quarter" ? 240 : this.state.daily !== "quarter" ? 110 : this.state.quarter === "all" ? 100 : 0
                    }}>
                        <button type="button" onClick={e => this.submit(e)} className="btn" id="navbutton">Filter</button>
                    </NavItem>


                </Nav>
                {/* this is the icon Header ..............................................*/}
                <Nav pullRight className="navRight">
                    <NavItem eventKey={1} className="nameRight">{name.userName}</NavItem>
                    <NavItem eventKey={2} onClick={this.logOut}>Log out</NavItem>
                </Nav>
            </div >
        );
    }
}

export default withRouter(HeaderLinks);
