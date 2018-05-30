import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Table from 'variables/TableNonopsOffered.jsx';
import {dataSetNonopsOffered} from 'variables/Variables.jsx';

class TableList extends Component {

    render() {
        return (
            <div className="content" >
                <Grid fluid>
                    <Row>
                        <Col md={12}>         
                            <Card
                                title="Non-Ops Offered Table"
                                category="data for Non-Ops Offered"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table data={dataSetNonopsOffered} />
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default TableList;
