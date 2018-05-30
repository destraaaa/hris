import React, { Component } from "react";
import {Popover, OverlayTrigger } from 'react-bootstrap';
import {
    withRouter
} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
const popoverE = (
    <Popover id="popover-positioned-left" >
        Input your <strong>Valid Email</strong> to Registration
    </Popover>
);
const popoverN = (
    <Popover id="popover-positioned-left" >
        <strong>NonOps </strong> 
         It's such like Software Engineering, Business Finance, Intern, etc
    </Popover>
);
const popoverO = (
    <Popover id="popover-positioned-right" >
        <strong>Ops </strong> 
         It's such like Call Center Office, Customer Care, etc
    </Popover>
);

var emailCheck = []
var check = false
class FormValid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // interview: "",
            formType: "",
            err: "",
            email: "",
            errEmpty:"",
            main: true,
            timeFirst: false,
            timeSecond: false,
            buttonFirst: true,
            buttonSecond: false
        };
        this.change = this.change.bind(this);
        this.next1 = this.next1.bind(this);
        this.next2 = this.next2.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount(){
        axios.get("http://0.0.0.0:8080/interviewee/email").then(res => {
            
            res.data.forEach(item => {
                emailCheck.push(item.email)
            });
        })
    }

    // button on click handler............................

    validate(){
        let isError = false;
        let check = /^.+@.+\..+$/
        const error = {
            err:""
        };
        if (!check.test(this.state.email)) {
            isError = true;
            error.err = "Email Format is Wrong";
        }
        if (this.state.email === "") {
            isError = true;
            error.err = "the column is empty, please fill the column first!!!";
        }

        
        this.setState(error);
        return isError

    }

    validate2(){
        let isError = false;
        const error = {
            errEmpty:""
        };
        if(this.state.formType ==="")
        {
            isError = true;
            error.errEmpty = "choose one Form first!!";
        }
        window.scroll(0,0)
        this.setState(error);
        return isError
    }

    next1(e) {
       e.preventDefault();
       const err = this.validate();
       if(!err){
           emailCheck.forEach(item=> {
            if(this.state.email === item)
            {
                 check = true
            }
           })
       
           if(check){
                check = false
           }
           else
           {
            this.setState({
                        main: false,
                        timeFirst: true,
                        buttonFirst: false,
                        buttonSecond: true
                    });
            }
           }
       }
    

    next2(e) {
        e.preventDefault();
        const err = this.validate2();
        if(!err){
           Cookies.set('__intvw', this.state.formType, { expires: 0.3, path: "/" });
           Cookies.set('__email', this.state.email, { expires: 0.3, path: "/" });           
           window.location.href = "/register/form"
         }
    }


    back1() {
        this.props.history.push("/register")
    }
    back2() {
            this.setState({
                main: true,
                timeFirst: false,
                buttonFirst: true,
                buttonSecond: false
            });
        }
    //..............................................

    render() {
        return (
            <div>
                <div className="row1">
                    <h4>Registration Form  PT.Tokopedia</h4>
                    <div id="emailWelcome"  style={{ display: this.state.main ? 'block' : 'none' }}>
                      
                        <p className="pRegist" style={{color: "#ff0019"}} >{this.state.err}</p>
                        <div className="input-group input-group-icon">
                    <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverE}>
                        
                            <input
                                placeholder="Email"
                                type="text"
                                name="email"
                                id="emailWelcomeIn"
                                value={this.state.email}
                                onChange={e => this.change(e)}
                            />
                    </OverlayTrigger>                            
                            <pre id="example">example: example@tokopedia.com</pre>
                            <div className="input-icon"><i className="fa fa-envelope" /></div>
                        </div>
                    </div>

                    <div className="input-group" style={{ display: this.state.timeFirst ? 'block' : 'none' }}>
                        <p className="pRegist" id="validate" >{this.state.errEmpty}</p>
                        <p style={{ paddingBottom: 15, marginTop: 25, textAlign: "center" }}>What Registration Form do you want to Regist?</p>
                        <div id="interview" style={{ paddingBottom: 30 }}>
                            <input
                                name="formType"
                                value="Non Operational Form"
                                id="formType-yes"
                                type="radio"
                                onChange={e => this.change(e)}
                            />  
                        <OverlayTrigger  trigger={['hover', 'focus']} placement="left" overlay={popoverN}>                               
                            <label id="interviewFirst" htmlFor="formType-yes">Non Operational Form</label>
                        </OverlayTrigger>  
                            <input
                                name="formType"
                                value="Operational Form"
                                id="formType-no"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                        <OverlayTrigger  trigger={['hover', 'focus']} placement="right" overlay={popoverO}>                                                           
                            <label id="interviewFirst" htmlFor="formType-no">Operational Form</label>
                        </OverlayTrigger>                                
                        
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
                            type="submit"
                            className="btn"
                            onClick={e=>this.next2(e)}
                        >Next</button>
                        <button
                            type="submit"
                            className="btn"
                            onClick={this.back2.bind(this)}
                        >back</button>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(FormValid);