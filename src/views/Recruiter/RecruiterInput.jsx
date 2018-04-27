import React, { Component } from 'react';
import axios from 'axios';


export default class RecruiterInput extends Component {
    constructor() {
        super();
        this.state = { name: "" , email:""}
    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit() {
        const users = {
          name: this.state.name,
          email: this.state.email+"@tokopedia.com"
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

            // this.setState({
            //     name:"",
            //     email:""
            // })

            window.location.href = "/Recruiter"
    }
    render() {
        return (
            <div>

                <div className="row1">
                    <p id="inputEmail" >Add email that will become new user</p>
                    <div className="input-group input-group-icon" style={{left:75}}>
                        
                        <div style={{ position: "relative", left: 10 }}>
                            <input
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={e => this.change(e)}
                                style={{ width: 370, paddingRight: 130 }}
                            />
                            <span id="inputRecruiter">@tokopedia.com</span>
                            <div className="input-icon"><i className="fa fa-envelope" /></div>

                            <input
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={e => this.change(e)}
                                style={{ width: 370, paddingRight: 130 }}
                            />
                            <pre id="example">Rembember!!! User that have been add can access this dashboard</pre>
                            <div className="input-icon" style={{left:373}}><i className="fa fa-user" /></div>
                        </div>
                        <button
                            id ="btnInput"
                            type="button"
                            className="btn"
                            onClick={this.onSubmit.bind(this)}
                            style={{ position: "absolute", left: 780, bottom: 25 }}
                        >ADD</button>
                    </div>
                </div>

                

            </div>
        )
    }

}