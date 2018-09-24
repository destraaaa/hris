import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Input from './SurveyInput';

class Survey extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Survey"
                                category="survey of tokopedia"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Input />
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Survey;
