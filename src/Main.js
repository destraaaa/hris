import React, { Component } from "react";
import {
    Route,
    Link,

} from 'react-router-dom';
import Page1 from './RegistPage/Page1';
import Page2 from './RegistPage/Page2';
import Page3 from './RegistPage/Page3';
import Page4 from './RegistPage/Page4';
import Welcome from './RegistPage/Welcome';
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
                        <Route exact path="/register" component={Welcome} />
                        <Route path="/register/page1" component={Page1} />
                        <Route path="/register/page2" component={Page2} />
                        <Route path="/register/page3" component={Page3} />
                        <Route path="/register/page4" component={Page4} />
                       
                    </div>
                </div>
          
        )
    }
}

export default Main;