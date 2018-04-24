import React, { Component } from "react";
import {
    Route,
    Link,
    Switch

} from 'react-router-dom';
import Page1 from './RegistPage/Page1';
import Page2 from './RegistPage/Page2';
import Page3 from './RegistPage/Page3';
import Page4 from './RegistPage/Page4';
import Welcome from './RegistPage/Welcome';
import Form from "./RegistPage/Regist";
import notUser from './RegistPage/notUser';

const NoMatch = ({ location }) => (
    <div>
        <div className="row1">
            <h1>404 PAGE NOT FOUND</h1>
            <h2 style={{ color: "red", textAlign: "center" }}>We are sorry there is no Link for: <code>{location.pathname}</code></h2>
        </div>
    </div>
);
class Main extends Component {
    // handleData(data) {
    //     this.setState({
    //         referralName: data
    //     });
    // }

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
                    {/* pass: {this.state.referralName} */}

                    {/* <Route exact path="/register" render={state => (
                        <Welcome data={this.state} />
                    )} />
                    <Route path="/register/page1" component={Page1} />
                    <Route path="/register/page2" component={Page2} />
                    <Route path="/register/page3" render={state => (
                        <Page3 handlerFromParant={this.handleData} />
                    )} />
                    <Route path="/register/page4" component={Page4} /> */}
                    <Switch>
                        <Route exact path="/register" component={Welcome} />
                        <Route path="/register/form" component={Form} />
                        <Route path="/register/notUser" component={notUser} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>

        )
    }
}

export default Main;

