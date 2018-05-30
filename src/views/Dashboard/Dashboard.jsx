import React, { Component } from 'react';
import { Pie, HorizontalBar } from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import {
    HBcolor,
    Bcolor,
} from 'variables/Variables.jsx';

const option = {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                    if (Math.floor(value) === value) {
                        return value;
                    }
                }
            },
            stacked: true
        }],

        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
            stacked: true
        }]
    },
    legend: {
        display: true
    }
};


class Dashboard extends Component {
    constructor() {
        super();
        this.change = this.change.bind(this);
        this.state = {
            schoolF: "all",
            positionF: "all",
            totalCandidate: null,
            successCandidate: null,
            rejectCandidate: null,
            progressCandidate: null,
            datapieSchool: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: Bcolor,
                    hoverBackgroundColor: HBcolor
                }]
            },
            datapieJob: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: Bcolor,
                    hoverBackgroundColor: HBcolor
                }]
            },
            datapieStat: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: Bcolor,
                    hoverBackgroundColor: HBcolor
                }]
            },
            databarCP: {
                labels: [],
                datasets: [{
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack: 1
                },
                {
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack: 1
                },
                {
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack: 1
                },
                {
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack: 1
                }
                ]
            },
            databarStat:
                {
                    labels: ["NO STATUS", "REJECT", "APPROVED", "ON PROGRESS", "OFFERING - ACCEPTED", "OFFERING - DECLINED", "OFFERING - CANCEL", "HOLD", "HOLD-REJECT", "CLOSED"],
                    datasets: [{
                        data: [],
                        backgroundColor: Bcolor,
                        hoverBackgroundColor: HBcolor
                    }]
                },
            databarPos:
                {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: Bcolor,
                        hoverBackgroundColor: HBcolor
                    }]
                }

        }
    }

    componentDidMount() {
        //Total----------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/total`).then(res => {
            var Total = []
            var Success = []
            var Reject = []
            var Progress = []
            res.data.forEach(function (item) {
                Total.push(item.total),
                    Success.push(item.approved),
                    Reject.push(item.reject),
                    Progress.push(item.onprogress)
            })
            this.setState({
                totalCandidate: Total,
                successCandidate: Success,
                rejectCandidate: Reject,
                progressCandidate: Progress
            })
        })


        //school--------------------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/schoolpie`).then(res => {

            var Labels = [];
            var Series = [];

            res.data.forEach(function (item) {
                Labels.push(item.labels)
                Series.push(item.series)
            })


            this.setState({
                datapieSchool: {
                    labels: Labels,
                    datasets: [{
                        data: Series,
                    }]
                }
            })

        })


        //job information----------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/jobpie`).then(res => {

            var Labels = [];
            var Series = [];

            res.data.forEach(function (item) {
                Labels.push(item.labels)
                Series.push(item.series)

            })

            this.setState({
                datapieJob: {
                    labels: Labels,
                    datasets: [{
                        data: Series,
                    }]
                }
            })
        })


        // Position applicant-----------------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/posbar`).then(res => {
            var Labels = [];
            var Series = [];

            res.data.forEach(function (item) {
                Labels.push(item.labels)
                Series.push(item.series)

            })

            this.setState({
                databarPos: {
                    labels: Labels,
                    datasets: [{
                        data: Series
                    }]
                }
            })

        })


        // Recruitment per Contact Person-----------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/cpbar`).then(res => {
            var Labels = [];
            var noStatus = [];
            var reject = [];
            var Approved = [];
            var onProgress = [];
            var offeringAccept = [];
            var offeringDecline = [];
            var offeringCancel = [];
            var holds = [];
            var holdRejected = [];
            var closed = []

            res.data.forEach(function (item) {
                Labels.push(item.labels)
                noStatus.push(item.nostatus)
                reject.push(item.reject)
                Approved.push(item.approved)
                onProgress.push(item.onprogress)
                offeringAccept.push(item.offeringAccepted)
                offeringDecline.push(item.offeringDeclined)
                offeringCancel.push(item.offeringCancel)
                holds.push(item.holds)
                holdRejected.push(item.holdsReject)
                closed.push(item.closed)
            })
            this.setState({
                databarCP: {
                    labels: Labels,
                    datasets: [{
                        label: "No Status",
                        data: noStatus,
                        backgroundColor: "#9E9E9E",
                        stack: 1
                    },
                    {
                        label: "Reject",
                        data: reject,
                        backgroundColor: "#F44336",
                        stack: 1
                    },
                    {
                        label: "Approved",
                        data: Approved,
                        backgroundColor: "#00C853",
                        stack: 1
                    },
                    {
                        label: "On Progress",
                        data: onProgress,
                        backgroundColor: "#03A9F4",
                        stack: 1
                    },
                    {
                        label: "Offering-Accept",
                        data: offeringAccept,
                        backgroundColor: "#098700",
                        stack: 1
                    },
                    {
                        label: "Offering-Decline",
                        data: offeringDecline,
                        backgroundColor: "#f46e07",
                        stack: 1
                    },
                    {
                        label: "Offering-Cancel",
                        data: offeringCancel,
                        backgroundColor: "#8e3926",
                        stack: 1
                    },
                    {
                        label: "Hold",
                        data: holds,
                        backgroundColor: "#e5cf09",
                        stack: 1
                    },
                    {
                        label: "Hold-Rejected",
                        data: holdRejected,
                        backgroundColor: "#875306",
                        stack: 1
                    },
                    {
                        label: "Closed",
                        data: closed,
                        backgroundColor: "#160d00",
                        stack: 1
                    }
                    ]
                }
            })
        })


        // Status of applicant---------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/statbar`).then(res => {
            var Series = [];

            res.data.forEach(function (item) {
                Series.push(item.series)

            })

            this.setState({
                databarStat: {
                    datasets: [{
                        data: Series
                    }]
                }
            })

        })


        // Stat Final information-------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/statpie`).then(res => {
            var Labels = [];
            var Series = [];

            res.data.forEach(function (item) {
                Labels.push(item.labels)
                Series.push(item.series)

            })

            this.setState({
                datapieStat: {
                    labels: Labels,
                    datasets: [{
                        data: Series,
                    }]
                }
            })

        })


    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if ([e.target.name] == "schoolF") {
            let filter = {
                type: "school",
                value: e.target.value
            }
            var authOptions = {
                method: 'POST',
                url: 'http://0.0.0.0:8080/nonopsform/filterChart',
                data: JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };
            axios(authOptions)
        }

        else if ([e.target.name] == "positionF") {
            let filter = {
                type: "position",
                value: e.target.value
            }
            var authOptions = {
                method: 'POST',
                url: 'http://0.0.0.0:8080/nonopsform/filterChart',
                data: JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };
            axios(authOptions)
        }

        this.props.history.push("/");
    };


    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        {/* total---------------------------------------------------------------------- */}
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-server text-warning"></i>}
                                statsText="Participant"
                                statsValue={this.state.totalCandidate}
                                statsIcon={<i className="fa fa-address-card-o"></i>}
                                statsIconText="Total Participant"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-thumbs-o-up text-success"></i>}
                                statsText="Accepted"
                                statsValue={this.state.successCandidate}
                                statsIcon={<i className="fa fa-calendar-check-o"></i>}
                                statsIconText="Total Accepted"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-thumbs-down text-danger"></i>}
                                statsText="Rejected"
                                statsValue={this.state.rejectCandidate}
                                statsIcon={<i className="fa fa-calendar-times-o"></i>}
                                statsIconText="Total Rejected"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-help1 text-info"></i>}
                                statsText="On Progress"
                                statsValue={this.state.progressCandidate}
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="On Progress Status"
                            />
                        </Col>
                    </Row>
                    <Row>


                        {/* ---------------PieChart for University Statistics--------------------------- */}
                        <Col md={6}>
                            <Card
                                statsIcon="fa fa-database"
                                title="School Statistics"
                                category="percentage candidate School"
                                stats="School Statistics candidate School Data"
                                content={

                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <span>&nbsp; School Show</span>
                                        <select name="schoolF" id="schoolDash" value={this.state.schoolF} onChange={e => this.change(e)}>
                                            <option value="all" disabled>-</option>
                                            <option value="all">All</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                        <Pie
                                            data={this.state.datapieSchool}
                                            width={150}
                                            height={100}
                                            respoinsive={true}
                                        />

                                    </div>
                                }
                            />
                        </Col>


                        {/* ---------------PieChart for job information----------------------------- */}
                        <Col md={6}>
                            <Card
                                statsIcon="fa fa-database"
                                title="Job Information"
                                category="percentage job Information"
                                stats="Job Information From Data"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <Pie
                                            data={this.state.datapieJob}
                                            width={150}
                                            height={100}

                                        />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        {/* ---------------Position Selection-------------------------------------------- */}
                        <Col md={12} style={{ height: 550 }} >
                            <Card
                                statsIcon="fa fa-database"
                                title="Position Selection"
                                category="percentage Position Selected"
                                stats="Position Selection Data"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <span>&nbsp; Position Show</span>
                                        <select name="positionF" id="schoolDash" value={this.state.positionF} onChange={e => this.change(e)}>
                                            <option value="all" disabled>-</option>
                                            <option value="all">All</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                        <HorizontalBar
                                            data={this.state.databarPos}
                                            width={150}
                                            height={50}
                                            respoinsive={true}
                                            options={{
                                                legend: false, scales: {
                                                    xAxes: [{
                                                        ticks: {
                                                            beginAtZero: true, callback: function (value, index, values) {
                                                                if (Math.floor(value) === value) {
                                                                    return value;
                                                                }
                                                            }
                                                        }
                                                    }]
                                                }
                                            }}
                                        />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>


                        {/* ---------------Recruitment per Contact Person------------------------------- */}
                        <Col md={12} style={{ height: 550 }} >
                            <Card
                                statsIcon="fa fa-database"
                                title="Recruitment per Contact Person"
                                category="data of Applicant"
                                stats="Recruitment per Contact Person Data"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <HorizontalBar
                                            data={this.state.databarCP}
                                            width={150}
                                            height={50}
                                            respoinsive={true}
                                            options={option}

                                        />
                                    </div>
                                }
                            />
                        </Col>


                        {/* ---------------Status of Participant------------------------------------- */}
                        <Col md={6} >
                            <Card
                                statsIcon="fa fa-database"
                                title="Status of Participant"
                                category="stat Status"
                                stats="Status of Participant Data"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <HorizontalBar
                                            data={this.state.databarStat}
                                            width={150}
                                            height={70}
                                            respoinsive={true}
                                            options={{ legend: false, scales: { xAxes: [{ ticks: { beginAtZero: true } }] } }}
                                        />
                                    </div>
                                }
                            />
                        </Col>

                        {/* ---------------Final  Applicant Status------------------------------------------- */}
                        <Col md={6} >
                            <Card
                                statsIcon="fa fa-database"
                                title="Final  Applicant Status"
                                category="percentage Status"
                                stats="Final  Applicant Status Data"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <Pie
                                            data={this.state.datapieStat}
                                            width={150}
                                            height={100}
                                        />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Dashboard);
