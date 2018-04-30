import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Pie, HorizontalBar } from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import axios from 'axios';
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
                
            },
            stacked: true
        }],
        yAxes: [{
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
        this.state = {
            totalCandidate: 0,
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

            databarCP: {
                labels: [],
                datasets: [{
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack:1
                },
                {
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack:1
                },
                {
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack:1
                },
                {
                    label: "",
                    data: [],
                    backgroundColor: "",
                    stack:1
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

            console.log(res);
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
                        stack:1
                    },
                    {
                        label: "Reject",
                        data: reject,
                        backgroundColor: "#F44336",
                        stack:1
                    },
                    {
                        label: "Approved",
                        data: Approved,
                        backgroundColor: "#00C853",
                        stack:1
                    },
                    {
                        label: "On Progress",
                        data: onProgress,
                        backgroundColor: "#03A9F4",
                        stack:1
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
                    labels:Labels,
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
            res.data.forEach(function (item) {
                Total.push(item.total)
            })
            this.setState({
                totalCandidate: Total
            })
        }).catch(function (error) {
            console.log(error);
        })

    }
    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }

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
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success"></i>}
                                statsText="Revenue"
                                statsValue="$1,345"
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="Last day"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-danger"></i>}
                                statsText="Errors"
                                statsValue="23"
                                statsIcon={<i className="fa fa-clock-o"></i>}
                                statsIconText="In the last hour"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-twitter text-info"></i>}
                                statsText="Followers"
                                statsValue="+45"
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="Updated now"
                            />
                        </Col>
                    </Row>
                    <Row>

                        {/* ---------------PieChart for University Statistics------------------- */}
                        <Col md={6}>

                            <Card
                                statsIcon="fa fa-clock-o"
                                title="School Statistics"
                                category="percentage candidate School"
                                stats="Campaign sent 2 days ago"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        {/* <ChartistGraph data={datapie.chartpie} options={optionsPie} responsiveOptions={responsiveOptionsPie} type="Pie"/> */}
                                        <Pie
                                            data={this.state.datapieSchool}
                                            width={150}
                                            height={100}
                                        />
                                    </div>
                                }
                            />
                        </Col>
                        {/* ---------------PieChart for University Statistics------------------- */}

                        <Col md={6}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Job Information"
                                category="percentage job Information"
                                stats="Campaign sent 2 days ago"
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
                                statsIcon="fa fa-clock-o"
                                title="Recruitment per Contact Person"
                                category="percentage Recruitment"
                                stats="Campaign sent 2 days ago"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <HorizontalBar
                                            data={this.state.databarPos}
                                            width={150}
                                            height={50}
                                            respoinsive={true}
                                            options={{ legend: false, scales: { xAxes: [{ ticks: { beginAtZero: true } }] } }}
                                        />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                    <Col md={12} style={{ height: 550 }} >
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Applicant Status per Contact Person"
                                category="data of Applicant"
                                stats="Campaign sent 2 days ago"
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
                                statsIcon="fa fa-clock-o"
                                title="Status of Participant"
                                category="percentage Status"
                                stats="Campaign sent 2 days ago"
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
                        
                    </Row>

                </Grid>
            </div>
        );
    }
}

export default Dashboard;
