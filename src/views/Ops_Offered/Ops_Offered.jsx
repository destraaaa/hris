import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Table from 'variables/Table.jsx';
import {dataSet} from 'variables/Variables.jsx';

class TableList extends Component {

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Ops Offered"
                                category="Data Ops Offered"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table data={dataSet}/>
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
