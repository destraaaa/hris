import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <div className="row1">
                    <h1>WELCOME TO PT.TOKOPEDIA</h1>
                    <div>
                        <h3 style={{ color: "red", textAlign: "center", fontFamily:"Comic Sans MS", fontWeight:"bold" }}>please press continue button to enter the form of Registration</h3>
                            <Link to="/register/welcome">
                            <button
                                type="button"
                                className="btn"
                                id= "btnWelcome"
                            >continue</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;