import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
class Main extends Component {

    render() {
        const styles = {
            image: {
                padding: 10,
                width: 600,
                height: 200
            }
        }
        return (
                <div>
                    <div className="row1">
                        <h1>WELCOME TO PT.TOKOPEDIA</h1>
                        <h2 style={{color:"red", textAlign:"center"}}>please press continue button to enter the form</h2>
                        <Link to="/register/page1"><button 
                        type="button" 
                        className="btn"
                        style={{position:"relative", right:205}}
                        >continue</button></Link>
                    </div>
                </div>
          
        )
    }
}

export default Main;