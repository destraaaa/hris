import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Cookies from 'js-cookie';

const responseGoogle = (response) => {
    console.log(response);
    axios.get('http://0.0.0.0:8080/authLogin/validate').then(res => {
        var user = []
        let token = response.Zi.access_token
        
        res.data.forEach(function (item) {
            user.push(item.email)
        })

        user.forEach(function (item) {
            if (response.w3.U3 === item) {
                //redirect to dashboard
                Cookies.set('__hrid', token, {expires: 1, path:'/'})
                Cookies.set('__hrnu', response.profileObj.name, {expires: 1, path: '/'})                
                window.location.href = '/dashboard';
                console.log(token);
            }
            else {
                //redirect to register
                window.location.href = '/register/error';
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
                        

                            <div>
                                <GoogleLogin
                                    clientId="667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    className="g-signin2"
                                    buttonText=""
                                    style={{ position: "relative", top: 105, left: 250, }}
                                />
                            </div>
                            <Link to="/register/welcome">
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