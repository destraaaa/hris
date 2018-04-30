import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Table from 'variables/TableRecruiter';
import Input from './RecruiterInput';


class Recruiter extends Component {
    componentDidMount(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div className="content">

                <Grid fluid>

                    <Row>
                        <Col md={12}>
                            <Card
                                title="Recruiters"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Input />
                                }
                            />
                        </Col>
                        <Col md={12}>
                            <Card
                                category="data of Recruiters"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table />
                                }
                            />
                        </Col>




                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Recruiter;
