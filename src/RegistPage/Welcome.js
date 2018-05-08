import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


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
                    <div>
                        <h2 style={{ color: "red", textAlign: "center" }}>please press continue button to enter the form</h2>
                            <Link to="/register/welcome">
                            <button
                                type="button"
                                className="btn"
                                style={{ position: "relative", right: 215, bottom: 25 }}
                            >continue</button></Link>
                    </div>

                    

                    <div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Main;