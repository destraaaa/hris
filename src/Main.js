import React, { Component } from "react";
import {
    Route,
    Switch

} from 'react-router-dom';
import Welcome from './RegistPage/Welcome';
import Form from "./RegistPage/Regist";
import notUser from './RegistPage/notUser';
import FormValid from './RegistPage/FormValid';
import Card1 from './assets/img/cardWelcome.png';
import Card2 from './assets/img/cardRegist.png';
import {Grid,Col,Row} from 'react-bootstrap';

const NoMatch = ({ location }) => (
    <div>
        <div className="row1">
            <h1>404 PAGE NOT FOUND</h1>
            <h2 style={{ color: "red", textAlign: "center" }}>We are sorry there is no Link for: <code>{location.pathname}</code></h2>
        </div>
    </div>
);

class Main extends Component {
    render() {

        document.title = "PT.Tokopedia - Registration Form"
        return (
            <div>
            
                <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                <div className = "wrapper-form">
                    <div id="logo1">
                        <img src={require('./assets/img/logo1.png')} alt="logo" id="logoIn" draggable="false"/>
                    </div>
                    <div className= "containerRegist-wrapper">
                        <div className="containerRegist" style={{backgroundImage: window.parent.location.href === "http://localhost:3000/register/form"?`url(${Card2})`:`url(${Card1})`}}>
                            <Switch>
                                <Route exact path="/register" component={Welcome} />
                                <Route path="/register/form" component={Form} />
                                <Route path="/register/welcome" component={FormValid} />                        
                                <Route path="/register/error" component={notUser} />
                                <Route path="*" component={NoMatch} />
                            </Switch>
                        </div>
                    </div>
                </div>
                    </Col>
                </Row>
                </Grid>
            </div>

        )
    }
}

export default Main;

