import React, { Component } from 'react';
import { NavItem, Nav, Popover, OverlayTrigger } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const $ = require('jquery');

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
const popoverQuarter = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per Quarter data
    </Popover>
);
const popoverDate = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> per Month data
    </Popover>
);
const popoverWeek = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> Last Week data
    </Popover>
)
const popoverDay = (
    <Popover id="popover-positioned-left" >
        <strong>Filter!</strong> data for Today
    </Popover>
)

const year = parseInt((new Date().getFullYear()), 10);

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            years: "all",
            type: "all",
            daily: "year",
            quarter: "all",
            month: "all"

        }
        this.change = this.change.bind(this);
        this.resetQ = this.resetQ.bind(this);
    }


    componentDidMount() {
        $(document).ready(() => {
            $(".btn-filter")
                .mouseover(() => {
                    $(".filter-spawn").addClass("fill-spawn").animate({ right: "15px" }, "slow")
                })
                .mouseout(() => {
                    $(".filter-spawn").removeClass("fill-spawn").animate({ right: "5px" }, "slow")
                })
            $(".btn-filter").click(() => {
                $(".filter-container").slideToggle("slow")
            })
        })
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
        axios(authOptions).then(function (response) {
            console.log(response.status, "success");
        })
            .catch(function (error) {
                console.log(error);
            });

        if (window.parent.location.pathname === "/dashboard") {
            this.props.history.push("/");
        }
        if (window.parent.location.pathname === "/NonOps_Form_Response") {
            this.props.history.push('/NonOps_Form_Response')
            Cookies.set('__filt', 'NonOps_Form_Response', { expires: 1, path: '/' })
        }
        if (window.parent.location.pathname === "/Ops_Form_Response") {
            this.props.history.push("/Ops_Form_Response");
            Cookies.set('__filt', 'Ops_Form_Response', { expires: 1, path: '/' })
        }
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
        var quarterly = ["(Jan-Mar)", "(Apr-Jun)", "(Jul-Sep)", "(Oct-Des)"]
        if (this.state.years === "all" || this.state.years !== year.toString()) {
            for (let i = 1; i <= 4; i++) {
                arr.push(<option key={i} value={i}>
                    Q{i} {quarterly[i - 1]}</option>)
            }
        }
        else
            for (let i = 1; i <= quarter; i++) {
                arr.push(<option key={i} value={i}>Q{i} {quarterly[i - 1]}</option>)
            }

        return arr;
    }

    monthly() {
        var arr = [];
        let today = new Date();
        let quarter = (Math.floor((today.getMonth() + 3) / 3)).toString();
        const day = parseInt((new Date().getMonth()), 10);
        var monthly = ["January", "February", "March", "April", "Mei", "June",
            "July", "August", "September", "October", "November", "Desember"]
        let check = null;

        monthly.map((el, index) =>
            arr.push(<option key={el} value={el}>{monthly[index]}</option>)

        )
        // if (this.state.quarter === "1")
        //     check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 3
        // for (let i = 1; i <= check; i++) {
        //     arr.push(<option key={i} value={i}>
        //         {monthly[i - 1]}</option>)
        // }
        // if (this.state.quarter === "2") {
        //     check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 6
        //     for (let i = 4; i <= check; i++) {
        //         arr.push(<option key={i} value={i}>
        //             {monthly[i - 1]}</option>)
        //     }
        // }
        // if (this.state.quarter === "3") {
        //     check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 9
        //     for (let i = 7; i <= check; i++) {
        //         arr.push(<option key={i} value={i}>
        //             {monthly[i - 1]}</option>)
        //     }
        // }
        // if (this.state.quarter === "4") {
        //     check = this.state.quarter === quarter && this.state.years !== "all" ? (day + 1) : 12
        //     for (let i = 10; i <= check; i++) {
        //         arr.push(<option key={i} value={i}>
        //             {monthly[i - 1]}</option>)
        //     }
        // }
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

    typeCanFIlter() {
        return (
            <NavItem eventKey={3} id="navitem">
                <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverType}>
                    <select name="type" id="navbarType" onChange={e => this.change(e)}>
                        <option value="all" >All</option>
                        <option value="Non Operational Form">Nonops</option>
                        <option value="Operational Form">Ops</option>
                    </select>
                </OverlayTrigger>
            </NavItem>
        )
    }

    typeDaFilter() {
        return (
            <NavItem eventKey={4} id="navitem">
                <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={
                    this.state.daily === 'year' ? popoverYear : 
                    this.state.daily === 'quarter' ?popoverQuarter:
                    this.state.daily === 'month' ?popoverDate:
                    this.state.daily === 'week' ?popoverWeek:
                     this.state.daily === 'day'?popoverDay:""}>
                    <select name="daily" id="navbarType" onChange={e => this.change(e)} onClick={this.resetQ}>
                        <option value="year">Yearly</option>
                        <option value="quarter">Quarter</option>
                        <option value="month">Monthly</option>
                        <option value="week" >Week</option>
                        <option value="day">Today</option>

                    </select>
                </OverlayTrigger>
            </NavItem>
        )
    }

    yearsFilter() {
        return (
            <NavItem eventKey={2} id="navitem">
                <div style={{ display: ['week','day'].indexOf(this.state.daily) !== -1 ? "none" : "block" }}>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverYear}>
                        <select name="years" id="navbarYear" onChange={e => this.change(e)} onClick={this.resetY.bind(this)}>
                            <option value="all">All</option>
                            {this.yearly()}
                        </select>
                    </OverlayTrigger>
                </div>
            </NavItem>
        )
    }

    quarterFilter() {
        return (
            <NavItem eventKey={5} id="navItemQ">
                <div style={{ display: this.state.daily === "quarter" ? "block" : "none" }}>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverQuarter}>
                        <select name="quarter" value={this.state.quarter} id="navbarQ" onChange={e => this.change(e)} onClick={this.resetQ}>
                            {this.quarterly()}
                        </select>
                    </OverlayTrigger>
                </div>
            </NavItem>
        )
    }

    monthFilter() {
        return (
            <NavItem eventKey={5} id="navItemM">
                <div style={{ display: this.state.daily === "month" ? "block" : "none" }}>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverQuarter}>
                        <select name="month" id="navbarM" onChange={e => this.change(e)}>
                            {this.monthly()}
                        </select>
                    </OverlayTrigger>
                </div>
            </NavItem>
        )
    }

    render() {
        return (
            <div className= "filter">
                <button className="btn btn-filter"><i className="filter-icon fa fa-filter" /></button>
                <span className="filter-spawn">Filter</span>
                <div className="filter-container">
                    <Nav className="filter-col">
                        {['/Ops_Form_Response', '/NonOps_Form_Response', '/Ops_Offered', '/Nonops_Offered'].indexOf(window.location.pathname) === -1 ? this.typeCanFIlter() : ""}
                        {this.typeDaFilter()}
                        {this.yearsFilter()}
                        {this.quarterFilter()}
                        {this.monthFilter()}

                        {/* <NavItem eventKey={6} id="navitem">
                    <div style={{ display: this.state.quarter !== "all" ? this.state.daily !== "quarter" ? "none" : "block" : "none" }}>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverQuarter}>
                            <select name="month" id="navbarM" onChange={e => this.change(e)}>
                                <option value="all">All</option>
                                {this.monthly()}
                            </select>
                        </OverlayTrigger>
                    </div>
                </NavItem> */}

                        <NavItem eventKey={6}
                            style={{
                                position: "relative",
                                right: ['week','day'].indexOf(this.state.daily) !== -1 ? 285 : this.state.daily !== 'quarter' ? 170 : this.state.daily !== 'month' || this.state.daily !== 'all' ? 40 : 0
                            }}
                        >
                            <button type="button" onClick={e => this.submit(e)} className="btn btn-main" id="navbutton">Filter</button>
                        </NavItem>
                    </Nav>
                </div>
            </div>
        )
    }
}

export default withRouter(Filter);
