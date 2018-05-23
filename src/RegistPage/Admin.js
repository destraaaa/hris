import React, { Component } from "react";
import {
    Link,
    Redirect
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
        })
       
            //redirect to register
            window.location.href = "/register/error"

    })
        .catch(function (error) {
            console.log(error);
        })
};

class Main extends Component {
    render() {
        document.title = "PT.Tokopedia - Admin HR Page"
        
        return (
            <div>
                <div id="logo1">
                    <img src={require('../assets/img/logo1.png')} alt="logo" id="logoIn" />
                 </div>
            <div className="containerRegist">
                <div className="row1">
                    <h1>WELCOME TO PT.TOKOPEDIA</h1>
                        <h3 style={{ color: "red", textAlign: "center",  fontWeight:"bold" }}>please press Sign In button to enter the Dashboard</h3>
                            <div style= {{paddingBottom: 40}}>
                                <GoogleLogin
                                    clientId="667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    className="g-signin2"
                                    style={{ position: "relative", top: 10, left: 240, }}
                                />
                            </div>
                </div>
            </div>

            </div>
        )
    }
}

export default Main;