import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import axios from 'axios';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    responsiveOptionsPie,
    optionsPie,
    optionsBar,
    responsiveBar,
    legendBar
} from 'variables/Variables.jsx';


var datapie = {
    chartpie: {
        labels: [],
        series: []
    }
}
class Dashboard extends Component {
    componentDidMount(){
        axios.get(`http://0.0.0.0:8080/nonopsform/view/chartpie`).then(res=>{
        console.log(res);
        var Labels = [];
        var Series = []

        res.data.forEach(function(item,index){
            Labels.push(item.labels)
            Series.push(item.series)
        })

        datapie.chartpie.labels = Labels
        datapie.chartpie.series = Series
            
        })
        .catch(function(error) {
            console.log(error);
    })
    }
    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
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
                                        <ChartistGraph data={datapie.chartpie} options={optionsPie} responsiveOptions={responsiveOptionsPie} type="Pie"/>
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
