import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Grid,Col,Row} from 'react-bootstrap';

const responseGoogle = (response) => {
    axios.get('http://0.0.0.0:8080/authLogin/validate').then(res => {
        var user = {
            email : [],
            id : [],
            status:[]
        }

        let token = response.Zi.access_token
        
        res.data.forEach(function (item) {
            user.email.push(item.email)
            user.id.push(item.id)
            user.status.push(item.status)
        })

        for(let i=0 ; i< user.email.length;i++)
        {
            if(response.w3.U3 === user.email[i])
            {                                    
                if(user.status[i])
                {
                    let inputId = user.id[i]
                    Cookies.set('__hrid', token, {expires: 1, path:'/'})
                    Cookies.set('__hrnu', response.profileObj.name, {expires: 1, path: '/'})   
                    Cookies.set('__hrni', inputId, {expires: 1, path: '/'})  
                    window.location.href = '/dashboard';                       
                }
                else
                    window.location.href = "/register/error";

                break;
            }
        }
    })
};

class Main extends Component {
    render() {
        document.title = "PT.Tokopedia - Admin HR Page"
        
        return (
            <div>
                <div>
                
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={6}>
                                <div className = "wrapper-form">
                                    <div id="logo1">
                                        <img src={require('../assets/img/logo1.png')} alt="logo" id="logoIn" draggable="false"/>
                                    </div>
                                    <div className= "containerRegist-wrapper">
                                        <div className="containerRegist">
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
                            </Col>
                        </Row>
                    </Grid>
                 </div>
            </div>
        )
    }
}

export default Main;