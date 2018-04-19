import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Pie } from 'react-chartjs-2';
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


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            datapie: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                    '#FF598F', '#FD8A5E', '#E0E300', '#01DDDD', '#00BFAF',
                    '#B0A472', '#F5DF65', '#2B9464', '#59C8DF', '#28BE9B',
                    '#92DCE0', '#609194', '#EF9950', '#CD1719', '#442D65',
                    '#775BA3', '#91C5A9', '#F8E1B4', '#F98A5F', '#E8A0B8',
                    '#FFC300', '#BCCF3D', '#02C9C9', '#333333', '#000000',
                    '#FF534B', '#021542', '#0241E2', '#AAAAAA', '#3F0082',
                     '#DFE0DB','#FF66CC', '#000000', '#F7F960'],
                     hoverBackgroundColor:[
                     '#FF59AD', '#FD8A5E', '#e0E3A0', '#01DDAD', '#00BFAF',
                     '#B0A4A2', '#F5DFA5', '#2B94A4', '#59C8AF', '#28BEAB',
                     '#92DCA0', '#6091A4', '#EF99A0', '#CD17A9', '#442DA5',
                     '#775BA3', '#91C5A9', '#F8E1A4', '#F98AAF', '#E8A0A8',
                     '#FFC3A0', '#BCCFAD', '#02C9A9', '#3333A3', '#0000A0',
                     '#FF53AB', '#0215A2', '#0241A2', '#AAAAAA', '#3F00A2',
                      '#DFE0AB','#FF66AC', '#0000A0', '#F7F9A0']
                    
                }]
            }
        }
    }
   
    componentDidMount() {

        axios.get(`http://0.0.0.0:8080/nonopsform/view/chartpie`).then(res => {
            var Labels = [];
            var Series = [];

            console.log(res);
            res.data.forEach(function (item) {
                Labels.push(item.labels)
                Series.push(item.series)
            })

            this.setState({
                datapie: {
                    labels: Labels,
                    datasets: [{
                        data: Series,
                    }]
                }
            })

        })
            .catch(function (error) {
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
        // console.log(datapie)
        return (

            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-server text-warning"></i>}
                                statsText="Capacity"
                                statsValue="105GB"
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
                        <Col md={6}>

                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title="Users Behavior"
                                category="24 Hours performance"
                                stats="Updated 3 minutes ago"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataSales}
                                            type="Line"
                                            options={optionsSales}
                                            responsiveOptions={responsiveSales}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendSales)}
                                    </div>
                                }
                            />
                        </Col>

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
                                            data={this.state.datapie}
                                            width={150}
                                            height={100}
                                        />
                                    </div>
                                }
                            />
                        </Col>
                        {/* ---------------PieChart for University Statistics------------------- */}
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="2014 Sales"
                                category="All products including Taxes"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataBar}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendBar)}
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
