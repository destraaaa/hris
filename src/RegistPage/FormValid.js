import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';
import Cookies from 'js-cookie';


class FormValid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interview: "",
            formType: "",
            err: "",
            email: "",
            main: true,
            timeFirst: false,
            timeSecond: false,
            buttonFirst: true,
            buttonSecond: false
        };
        this.change = this.change.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // button on click handler............................
    next1(e) {
       e.preventDefault();
        if (this.state.interview === "") {
            this.state.err = "the column is empty, please fill the column first!!!";
            console.log(this.state.err)
        }
        if (this.state.interview === "first") {
            this.setState({
                main: false,
                timeFirst: true,
                buttonFirst: false,
                buttonSecond: true
            });
        }
        else if (this.state.interview === "second") {
            this.setState({
                main: false,
                timeSecond: true,
                buttonFirst: false,
                buttonSecond: true
            });
        }

        this.setState({ err: "" })
    }

    next2(e) {
        e.preventDefault();
        if (this.state.interview === "first") {
            if (this.state.formType === "") {
                this.state.err = "the column is empty, please fill the column first!!!"
                console.log(this.state.err)
            }
            else {
                Cookies.set('__intvw', this.state.formType, { expires: 0.3, path: "/" });
                window.location.href = "/register/form"
            }
        }
        else if (this.state.interview === "second") {
            if (this.state.email === "") {
                this.state.err = "the column is empty, please fill the column first!!!"
                console.log(this.state.err)
            }
            else
                this.setState({
                    main: true,
                    timeSecond: false,
                    buttonFirst: true,
                    buttonSecond: false
                });
        }

        this.setState({ err: "" })
    }


    back1() {
        window.location.href = "/register"
    }
    back2() {
        if (this.state.interview === "first") {
            this.setState({
                main: true,
                timeFirst: false,
                buttonFirst: true,
                buttonSecond: false
            });
        }
        else if (this.state.interview === "second") {
            this.setState({
                main: true,
                timeSecond: false,
                buttonFirst: true,
                buttonSecond: false
            });
        }
    }
    //..............................................

    render() {
        return (
            <div>
                <p></p>
                <div className="row1">
                    <h4>Registration Form  PT.Tokopedia</h4>
                    <div className="input-group" id="interviewCard" style={{ display: this.state.main ? 'block' : 'none' }}>
                        <p className="pRegist" id="validate" >{this.state.err}</p>
                        <p style={{ paddingBottom: 10 }}>Whether this is you first time interview with Tokopedia?</p>
                        <div id="interview">
                            <input
                                name="interview"
                                value="first"
                                id="interview-yes"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label id="interviewFirst" htmlFor="interview-yes">My First time Interview</label>
                            <input
                                name="interview"
                                value="second"
                                id="interview-no"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label id="interviewFirst" htmlFor="interview-no">I have done interview before</label>
                        </div>
                    </div>

                    <div className="input-group" style={{ display: this.state.timeFirst ? 'block' : 'none' }}>
                        <p className="pRegist" id="validate" >{this.state.err}</p>
                        <p style={{ paddingBottom: 15, marginTop: 25, textAlign: "center" }}>What Registration Form do you want to Regist?</p>
                        <div id="interview" style={{ paddingBottom: 30 }}>
                            <input
                                name="formType"
                                value="Non Operational Form"
                                id="formType-yes"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label id="interviewFirst" htmlFor="formType-yes">Non Operational Form</label>
                            <input
                                name="formType"
                                value="Operational Form"
                                id="formType-no"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label id="interviewFirst" htmlFor="formType-no">Operational Form</label>
                        </div>
                    </div>

                    <div id="emailWelcome" style={{ display: this.state.timeSecond ? 'block' : 'none' }}>
                        <p className="pRegist" id="validate" >{this.state.err}</p>
                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={e => this.change(e)}
                                style={{ width: 400 }}
                            />
                            <pre id="example">example: example@tokopedia.com</pre>
                            <p className="pRegist" >Input email that you use to register?</p>
                            <div className="input-icon"><i className="fa fa-envelope" /></div>
                        </div>
                    </div>

                    <div style={{ display: this.state.buttonFirst ? 'block' : 'none' }}>
                        <button
                            type="button"
                            className="btn"
                            onClick={e=>this.next1(e)}
                        >Next</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={this.back1.bind(this)}
                        >Back</button>
                    </div>


                    <div style={{ display: this.state.buttonSecond ? 'block' : 'none' }}>
                        <button
                            type="button"
                            className="btn"
                            onClick={e=>this.next2(e)}
                        >Next</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={this.back2.bind(this)}
                        >back</button>
                    </div>

                </div>
            </div>

        )
    }
}

export default FormValid;