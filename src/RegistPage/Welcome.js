import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const responseGoogle = (response) => {
    console.log(response);
    axios.get('http://0.0.0.0:8080/authLogin').then(res => {
        var user = []
        res.data.forEach(function (item) {
            user.push(item.email)
        })

        user.forEach(function (item) {
            if (response.profileObj.email === item) {
                //redirect to dashboard
                window.location.href = '/dashboard';
                console.log("has enter");
            }
            else {
                //redirect to register
                window.location.href = '/register/notUser';
                console.log("has go out")
            }

        })

    })
        .catch(function (error) {
            console.log(error);
        })
}

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
                        <Link to="/register/form">

                            <div>
                                <GoogleLogin
                                    clientId="667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    className="g-signin2"
                                    buttonText=""
                                    // type = "div"
                                    style={{ position: "relative", top: 105, left: 250, }}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn"
                                style={{ position: "relative", right: 205, bottom: 60 }}
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