import React, { Component } from 'react';
import { Pie, HorizontalBar } from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import {

    optionsSales,
    dataSales,
    responsiveSales,
    legendSales,
    dataBar,
    responsiveOptionsPie,
    optionsPie,
    optionsBar,
    responsiveBar,
    legendBar
} from 'variables/Variables.jsx';

// HorizontalBar.pluginService.register({
//     afterDraw: function (chart) {
//         if (chart.data.datasets.length === 0) {
//             // No data is present
//             var ctx = chart.chart.ctx;
//             var width = chart.chart.width;
//             var height = chart.chart.height
//             chart.clear();

//             ctx.save();
//             ctx.textAlign = 'center';
//             ctx.textBaseline = 'middle';
//             ctx.font = "16px normal 'Helvetica Nueue'";
//             ctx.fillText('No data to display', width / 2, height / 2);
//             ctx.restore();
//         }
//     }
// });

const Bcolor = [
    '#FF598F', '#FD8A5E', '#E0E300', '#01DDDD', '#00BFAF',
    '#B0A472', '#F5DF65', '#2B9464', '#59C8DF', '#28BE9B',
    '#92DCE0', '#609194', '#EF9950', '#CD1719', '#442D65',
    '#775BA3', '#91C5A9', '#F8E1B4', '#F98A5F', '#E8A0B8',
    '#FFC300', '#BCCF3D', '#02C9C9', '#333333', '#000000',
    '#FF534B', '#021542', '#0241E2', '#AAAAAA', '#3F0082',
    '#DFE0DB', '#FF66CC', '#000000', '#F7F960']

const HBcolor = [
    '#FF59AD', '#FD8A5E', '#e0E3A0', '#01DDAD', '#00BFAF',
    '#B0A4A2', '#F5DFA5', '#2B94A4', '#59C8AF', '#28BEAB',
    '#92DCA0', '#6091A4', '#EF99A0', '#CD17A9', '#442DA5',
    '#775BA3', '#91C5A9', '#F8E1A4', '#F98AAF', '#E8A0A8',
    '#FFC3A0', '#BCCFAD', '#02C9A9', '#3333A3', '#0000A0',
    '#FF53AB', '#0215A2', '#0241A2', '#AAAAAA', '#3F00A2',
    '#DFE0AB', '#FF66AC', '#0000A0', '#F7F9A0']


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
                    labels: ["No Status", "Reject", "Approved", "On Progress"],
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

        }).catch(function (error) {
            console.log(error);
        })
        // job information-----------------------------------------------------------------------------
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

        }).catch(function (error) {
            console.log(error);
        })

        // Stat Final information-----------------------------------------------------------------------------
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

        }).catch(function (error) {
            console.log(error);
        })

        // Contact Person-----------------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/cpbar`).then(res => {
            var Labels = [];
            var noStatus = [];
            var reject = [];
            var Approved = [];
            var onProgress = [];



            res.data.forEach(function (item) {
                Labels.push(item.labels)
                noStatus.push(item.nostatus)
                reject.push(item.reject)
                Approved.push(item.approved)
                onProgress.push(item.onprogress)

            })
            this.setState({
                databarCP: {
                    labels: Labels,
                    // datasets: [{
                    //     data: noStatus
                    // },
                    // {
                    //     data: reject
                    // },
                    // {
                    //     data: Approved
                    // },
                    // {
                    //     data: onProgress
                    // }]
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
                    }
                    ]
                }
            })
            console.log(this.state.databarCP.datasets);

        }).catch(function (error) {
            console.log(error);
        })

        // Status applicant-----------------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/statbar`).then(res => {
            var Series = [];
            console.log(res);
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

        }).catch(function (error) {
            console.log(error);
        })


        // Position applicant-----------------------------------------------------------------------------
        axios.get(`http://0.0.0.0:8080/nonopsform/view/posbar`).then(res => {
            var Labels = [];
            var Series = [];
            console.log(res);
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

        }).catch(function (error) {
            console.log(error);
        })


        //Total-------------------------------------------------------------------
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
        }).catch(function (error) {
            console.log(error);
        })

    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if ([e.target.name] == "schoolF") {
            console.log("school enter", e.target.value)
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
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if ([e.target.name] == "positionF") {
            console.log("position enter")
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
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        this.props.history.push("/");
    };

    render() {
        return (

            <div className="content">
                <Grid fluid>
                    <Row>
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

                        {/* ---------------PieChart for University Statistics------------------- */}
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
                        {/* ---------------PieChart for University Statistics------------------- */}

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
