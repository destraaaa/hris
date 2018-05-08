import React, { Component } from "react";
import {
    Route,
    Link,
    Switch

} from 'react-router-dom';
import Welcome from './RegistPage/Welcome';
import Form from "./RegistPage/Regist";
import notUser from './RegistPage/notUser';
import FormValid from './RegistPage/FormValid';


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
        const styles = {
            image: {
                padding: 10,
                width: 600,
                height: 200
            }
        }
        return (
            <div>

                <div id="logo1">
                    <img src={require('./assets/img/logo1.png')} alt="logo" style={styles.image} />
                </div>
                <div className="containerRegist">
                    <Switch>
                        <Route exact path="/register" component={Welcome} />
                        <Route path="/register/form" component={Form} />
                        <Route path="/register/welcome" component={FormValid} />                        
                        <Route path="/register/error" component={notUser} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </div>
            </div>

        )
    }
}

export default Main;

