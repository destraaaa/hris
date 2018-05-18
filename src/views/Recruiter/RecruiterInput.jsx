import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


export default class RecruiterInput extends Component {
    constructor() {
        super();
        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { name: "", email: "", nameErr: "", emailErr: "" }
    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate() {
        let isError = false
        const error = {
            nameErr: "",
            emailErr: ""
        }
        if (this.state.name === "") {
            isError = true;
            error.nameErr = "name is empty."
        }
        if (this.state.email === "") {
            isError = true;
            error.emailErr = "email is empty."
        }

        this.setState(error)
        return isError
    }

    onSubmit(e) {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            const users = {
                name: this.state.name,
                email: this.state.email + "@tokopedia.com",
                pic: Cookies.get("__hrnu")
            }

            var authOptions = {
                method: 'POST',
                url: 'http://0.0.0.0:8080/authLogin/user',
                data: JSON.stringify(users),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };
            axios(authOptions)
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                })
                .catch(function (error) {
                    console.log(error);
                });

            window.location.href = "/Recruiter"
        }
    }

    
    onDelete(e) {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            const users = {
                name: this.state.name,
                email: this.state.email + "@tokopedia.com",
            }
            var authOptions = {
                method: 'POST',
                url: 'http://0.0.0.0:8080/authLogin/delete',
                data: JSON.stringify(users),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };
            axios(authOptions)
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                })
                .catch(function (error) {
                    console.log(error);
                });

            window.location.href = "/Recruiter"
        }
    }

    render() {
        console.log(this.state.nameErr)
        return (
            <div>

                <div className="row1" id="recruiter">

                    <p id="inputEmail" >Add email that will become new user</p>
                    <p id="inputEmail" style={{ color: "#ff0019" }} >{this.state.nameErr} {this.state.emailErr}</p>
                    
                    <div className="input-group input-group-icon" style={{ left: 75 }}>

                        <div style={{ position: "relative", right: 65 }} >
                            <input
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={e => this.change(e)}
                                id = "emailRecruiter"
                            />
                            <span id="inputRecruiter">@tokopedia.com</span>
                            <div className="input-icon"><i className="fa fa-envelope" /></div>

                            <input
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={e => this.change(e)}
                                id = "nameRecruiter"
                            />
                            {/* <pre id="example">Rembember!!! User that have been add can access this dashboard</pre> */}
                            <div className="input-icon" id="iconRecruiter"><i className="fa fa-user" /></div>
                        </div>
                        <div id="recruiterBtn">
                        <button
                            id="btnInput"
                            type="button"
                            className="btn"
                            onClick={e => this.onSubmit(e)}
                        >ADD</button>
                        {/* <button
                            id="btnDelete"
                            type="button"
                            className="btn"
                            onClick={e => this.onDelete(e)}
                        >Delete</button> */}
                        </div>
                    </div>
                </div>



            </div>
        )
    }

}