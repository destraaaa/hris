import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Modal, Button} from 'react-bootstrap';

export default class Regist extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.checkBlur = "";
        this.show = false;
        this.showNew = false;
        this.isGoing = false;
        this.state = {
            show: false,
            fullName: "",
            nickName: "",
            phoneNumber: "",
            email: Cookies.get('__email'),
            school: "",
            major: "",
            GPA: "",
            purpose: "",
            meet: "",
            position: "",
            acquaintances: "",
            time: "",
            timeMM: "",
            timeHH: "",
            timeMA: "AM",
            infoJob: "",
            acquaintanceName: "",
            relationship: "",
            temp: "",
            meetErr: "",
            positionErr: "",
            GPAErr: "",
            timeErr: "",
            acquaintanceNameErr: "",
            relationshipErr: "",
            referralName: "",
            purposeErr: "",
            emailErr: "",
            referralNameErr: "",
            statErr: "",
            fullNameErr: "",
            phoneNumberErr: "",
            acquaintancesErr: "",
            infoJobErr :"",
            schoolErr:"",
            interviewers:[],
            schoolList:[],
            majorList:[],           
            formType: Cookies.get('__intvw')
        };
    }

    componentDidMount(){
        axios.get(`http://0.0.0.0:8080/authLogin/user`).then(res => {
            var Interviewer = [];
            res.data.forEach(function (item) {
                Interviewer.push(item.name)
            })
            this.setState({
                interviewers : Interviewer
            })
        })
        axios.get(`http://0.0.0.0:8080/form/schoolRegist`).then(res => {
            var SchoolList = [];
            var MajorList = [];
            res.data.forEach(function (item) {
                if(item.major !== undefined)
                {
                    MajorList.push(item.major)
                }
                if(item.labels !==undefined)
                {
                    SchoolList.push(item.labels)
                }
            })
            this.setState({
                schoolList : SchoolList,
                majorList : MajorList                
            })
        })
        
        var el = document.getElementById('phone');
        if(el){
        el.addEventListener('keydown', function(e) {
            if (e.which === 38 || e.which === 40) {
                e.preventDefault();
            }
        });
    }
}

    handleHide() {
        this.setState({ show: false });
        window.location.href = '/register';        
    }


    handleInputChange() {
        this.isGoing = !this.isGoing
    };

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    back() {
        Cookies.remove('__intvw');
        window.location.href = "/register/welcome"
    }


    validate() {
        let isError = false;
        let check = /^\d?[0-9]\.\d\d$/;
        let checkPhone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        let checkHH  = /^(0[1-9]|1[0-2])$/;
        let checkMM = /^([0-5]?[0-9])$/;
        const errors = {
            fullNameErr: "",
            phoneNumberErr: "",
            emailErr: "",
            purposeErr: "",
            meetErr: "",
            positionErr: "",
            acquaintancesErr: "",
            timeErr: "",
            GPAErr: "",
            schoolErr:"",
            acquaintanceNameErr: "",
            relationshipErr: "",
            referralNameErr: "",
            statErr: "",
            infoJobErr : ""
        };

        if(this.checkBlur !=="")
        {     
            if (this.state.fullName === "" && this.checkBlur === "fullName") {
                    isError = true;
                    errors.fullNameErr = "the full name column is empty.";
                }
                if (this.state.phoneNumber === "" && this.checkBlur === "phoneNumber") {
                    isError = true;
                    errors.phoneNumberErr = "the phone number column is empty.";
                }
                if (isNaN(this.state.phoneNumber) && this.checkBlur === "phoneNumber") {
                    isError = true;
                    errors.phoneNumberErr = "the phone number column is not a number.";
                }
                if (!checkPhone.test(this.state.phoneNumber) && this.checkBlur === "phoneNumber") {
                    isError = true;
                    errors.phoneNumberErr = "the phone number Format is wrong.";
                }
                if (this.state.school === "" && this.checkBlur === "school") {
                    isError = true;
                    errors.schoolErr = "the University/school column is empty.";
                }
                if (this.state.email === "" && this.checkBlur === "email") {
                    isError = true;
                    errors.emailErr = "the email column is empty.";
                }
                if (this.state.email.indexOf("@") === -1 && this.checkBlur === "email") {
                    isError = true;
                    errors.emailErr = "Requires valid email.";
                }
                if (this.state.purpose === "" && this.checkBlur === "purpose") {
                    isError = true;
                    errors.purposeErr = "the purpose column is empty.";
                }
                if (this.state.meet === "" && this.checkBlur === "meet") {
                    isError = true;
                    errors.meetErr = "the meet column is empty.";
                }
                if (this.state.position === "" && this.checkBlur === "position") {
                    isError = true;
                    errors.positionErr = "the position column is empty.";
                }
                if (this.state.acquaintances === "" && this.checkBlur === "acquaintances") {
                    isError = true;
                    errors.acquaintancesErr = "the acquaintances column is empty.";
                }
                if (this.state.infoJob ==="" && this.checkBlur === "infoJob"){
                    isError = true;
                    errors.infoJobErr = "the Job Info column is empty";
                }
                if (this.state.acquaintances === "yes") {
                    if (this.state.acquaintanceName === "" && this.checkBlur === "acquaintanceName") {
                        isError = true;
                        errors.acquaintanceNameErr = "the acquaintance Name column is empty.";
                    }

                    if (this.state.relationship === "" && this.checkBlur === "relationship") {
                        if(!this.state.relationship === "Other")
                       {
                            isError = true;
                            errors.relationshipErr = "the relationship column is empty.";
                        }
                    }
                }
                if (this.state.GPA === "" && this.checkBlur === "GPA") {
                    errors.GPAErr = "";
                }
                else if (!check.test(this.state.GPA) && this.checkBlur === "GPA") {
                    isError = true;
                    errors.GPAErr = "GPA format wrong.";
                }
                
                this.checkBlur = "";
        }
        else
        {
            if (this.state.fullName === "") {
                isError = true;
                errors.fullNameErr = "the full name column is empty.";
            }
            if (this.state.phoneNumber === "") {
                isError = true;
                errors.phoneNumberErr = "the phone number column is empty.";
            }
            if (isNaN(this.state.phoneNumber)) {
                isError = true;
                errors.phoneNumberErr = "the phone number column is not a number.";
            }
            if (!checkPhone.test(this.state.phoneNumber)) {
                isError = true;
                errors.phoneNumberErr = "the phone number Format is wrong.";
            }
            if (this.state.school === "") {
                isError = true;
                errors.schoolErr = "the University/school column is empty.";
            }
            if (this.state.email === "") {
                isError = true;
                errors.emailErr = "the email column is empty.";
            }
            if (this.state.email.indexOf("@") === -1) {
                isError = true;
                errors.emailErr = "Requires valid email.";
            }
            if (this.state.purpose === "") {
                isError = true;
                errors.purposeErr = "the purpose column is empty.";
            }
            if (this.state.meet === "") {
                isError = true;
                errors.meetErr = "the meet column is empty.";
            }
            if (this.state.position === "") {
                isError = true;
                errors.positionErr = "the position column is empty.";
            }
            if (this.state.acquaintances === "") {
                isError = true;
                errors.acquaintancesErr = "the acquaintances column is empty.";
            }
            if (this.state.infoJob ===""){
                isError = true;
                errors.infoJobErr = "the Job Info column is empty";
            }
            if (this.state.acquaintances === "yes") {
                if (this.state.acquaintanceName === "") {
                    isError = true;
                    errors.acquaintanceNameErr = "the acquaintance Name column is empty.";
                }
                if (this.state.relationship === "") {
                    isError = true;
                    errors.relationshipErr = "the relationship column is empty.";
                }
            }
            if (this.state.GPA === "") {
                errors.GPAErr = "";
            }
            else if (!check.test(this.state.GPA)) {
                isError = true;
                errors.GPAErr = "GPA format wrong.";
            }
            if (this.state.timeHH === "" || this.state.timeMM === "" || this.state.timeMA === "") {
                isError = true;
                errors.timeErr = "the time column is empty.";
            }
            if (parseInt((this.state.timeHH),10) < 0 || parseInt((this.state.timeHH),10) > 24) {
                isError = true;
                errors.timeErr = "the time is invalid";
            }
            if (parseInt((this.state.timeMM),10) < 0 || parseInt((this.state.timeMM),10) > 59) {
                isError = true;
                errors.timeErr = "the time is invalid";
            }
            if(!checkHH.test(this.state.timeHH.toString()) || !checkMM.test(parseInt((this.state.timeMM),10))){
                isError = true;
                errors.timeErr = "the time is format wrong"; 
            }
            if (this.state.temp === "" && this.state.relationship === "Other") {
                isError = true;
                errors.relationshipErr = "the relationship column is empty.";
            }
            if (this.isGoing === false) {
                isError = true;
                errors.statErr = "you haven't checked the statment yet.";
            }

        }

        this.setState(errors);
        return isError;
    };


    onBlur(e){
        this.checkBlur = e.target.name
        this.validate();
    }

    onSubmit(e) {
        e.preventDefault();
        const err = this.validate();
        window.scrollTo(0, 0);  
        if (!err) {         
            
            if (this.state.temp === "")
            this.setState({
                relationship : this.state.relationship
            })
            else
            this.setState({
                relationship : this.state.temp
            })
            
            this.setState({
                show: true
            })
            Cookies.remove('__intvw');

            const interviewee = {
                fullName: this.state.fullName,
                nickName: this.state.nickName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                school: this.state.school,
                major: this.state.major,
                GPA: this.state.GPA,
                purpose: this.state.purpose,
                meet: this.state.meet,
                position: this.state.position,
                time: this.state.timeHH + ":" + this.state.timeMM + " " + this.state.timeMA,
                infoJob: this.state.infoJob,
                acquaintance: this.state.acquaintances,
                acquaintanceName: this.state.acquaintanceName,
                relationship: this.state.relationship,
                referralName: this.state.referralName,
                formType: this.state.formType,
                progress: 1
            }

            var authOptions = {
                method: 'POST',
                url: 'http://0.0.0.0:8080/interviewee/save',
                data: JSON.stringify(interviewee),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };
            axios(authOptions)
            .catch(function (error) {
                console.log(error);
            });


            this.setState({
                fullNameErr: "",
                phoneNumberErr: "",
                emailErr: "",
                purposeErr: "",
                meetErr: "",
                positionErr: "",
                acquaintancesErr: "",
                timeErr: "",
                GPAErr: "",
                acquaintanceNameErr: "",
                relationshipErr: "",
                referralNameErr: ""
            });
        }
    };

    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title" >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                 Thank You For Your Registration
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3 style={{textAlign:"center"}}>Your Registration have Finish Please Press the Button to Continue</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide} style ={{position: "relative", right:"35%"}}>Continue</Button>
                        </Modal.Footer>
                </Modal>
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="row">
                        <h4>{this.state.formType} Registration Form  PT.Tokopedia</h4>
                        <div id = "HeaderText">
                        <span>Welcome ! This is a registration form for employee Candidate at PT. Tokopedia. </span>
                        <h5> you must fill asterisk column (required*)</h5> 
                        </div>
                        <p className="pRegist" id="validate" >{this.state.fullNameErr}</p>
                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Full Name*"
                                type="text"
                                name="fullName"
                                value={this.state.fullName}
                                style = {{border:this.state.fullNameErr!==""?"1.5px solid #ff1100ad": ""}}
                                onChange={e => this.change(e)} 
                                onBlur =  {e => this.onBlur(e)}
                                />
                                
                            <p className="pRegist" >Based on you National Identity Card (KTP)</p>
                            <div className="input-icon"><i className="fa fa-user" /></div>
                        </div>

                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Nick Name"
                                type="text"
                                name="nickName"
                                value={this.state.nickName}
                                onChange={e => this.change(e)}
                            />
                            <p className="pRegist" >What should we call you?</p>
                            <div className="input-icon"><i className="fa fa-user-o" /></div>
                        </div>

                        <p className="pRegist" id="validate" >{this.state.phoneNumberErr}</p>
                        <div className="input-group input-group-icon">
                            <input
                                id = "phone"
                                placeholder="phone Number*"
                                type="number"
                                name="phoneNumber"
                                style = {{border:this.state.phoneNumberErr!==""?"1.5px solid #ff1100ad": ""}}
                                value={this.state.phoneNumber}
                                onChange={e => this.change(e)}
                                onBlur =  {e => this.onBlur(e)}
                            />
                            <pre id="example">example: 08123456790 || 021987653</pre>
                            <p className="pRegist" >How can we contact you?</p>
                            <div className="input-icon"><i className="fa fa-phone-square" /></div>
                        </div>

                        <p className="pRegist" id="validate" >{this.state.emailErr}</p>
                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Email Adress*"
                                type="email"
                                name="email"
                                style = {{border:this.state.emailErr!==""?"1.5px solid #ff1100ad": ""}}
                                value={this.state.email}
                                onChange={e => this.change(e)}
                                onBlur =  {e => this.onBlur(e)}
                            />
                            <pre id="example">example: example@tokopedia.com</pre>
                            <p className="pRegist" >Input a valid email address.</p>
                            <div className="input-icon"><i className="fa fa-envelope" /></div>
                        </div>

                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Referral Name"
                                type="text"
                                name="referralName"
                                value={this.state.referralName}
                                onChange={this.change}
                            />
                            <p>If There, Please mention the name of your friend who refer you.</p>
                            <div className="input-icon"><i className="fa fa-user" /></div>
                        </div>
                        <p className="pRegist" id="validate" >{this.state.schoolErr}</p>
                        <div style={{ display: this.state.formType === "Non Operational Form" ? "block" : "none" }}>
                            <div className="input-group input-group-icon">
                                <input
                                    list="schoolList"
                                    placeholder="University / School*"
                                    type="text" name="school"
                                    value={this.state.school}
                                    onChange={e => this.change(e)}
                                    onBlur =  {e => this.onBlur(e)}
                                    style = {{border:this.state.schoolErr!==""? "1.5px solid #ff1100ad":""}}
                                />
                            <datalist id="schoolList">
                            {
                                   this.state.schoolList.map(el => <option value={el} key = {el}> {el} </option>)
                            }
                            </datalist>
                                <pre id="example">example: example University</pre>
                                <div className="input-icon"><i className="fa fa-building" /></div>
                            </div>

                            <div className="input-group input-group-icon">
                                <input
                                    list= "majorList"
                                    placeholder="Major/ Specialization"
                                    type="text"
                                    name="major"
                                    value={this.state.major}
                                    onChange={e => this.change(e)}
                                />
                            <datalist id="majorList">
                            {
                                   this.state.majorList.map(el => <option value={el} key = {el}> {el} </option>)
                            }
                            </datalist>
                                <pre id="example">example: Computer Science || industrial Engineering</pre>
                                <div className="input-icon"><i className="fa fa-cogs" /></div>
                            </div>

                            <p className="pRegist" id="validate" >{this.state.GPAErr}</p>
                            <div className="input-group input-group-icon">
                                <input
                                    id="phone"
                                    placeholder="GPA"
                                    type="number"
                                    name="GPA"
                                    value={this.state.GPA}
                                    style = {{border:this.state.GPAErr!==""? "1.5px solid #ff1100ad":""}}
                                    onChange={e => this.change(e)}
                                    onBlur =  {e => this.onBlur(e)}
                                />
                                <pre id="example">example: 3.45 || 3.40 || 3.00 ||70.25 || 85.00</pre>
                                <div className="input-icon"><i className="fa fa-industry" /></div>
                            </div>

                        </div>
                        <div style={{ display: this.state.formType === "Operational Form" ? "block" : "none" }}>
                            <div className="input-group input-group-icon">
                                <input
                                    list = "education"
                                    placeholder="Last Education"
                                    type="text" name="school"
                                    value={this.state.school}
                                    onChange={e => this.change(e)}  
                                    onBlur =  {e => this.onBlur(e)}        
                                />
                                <datalist id="education">
                                    <option value="SMA">SMA</option>
                                    <option value="SMK">SMK</option>
                                    <option value="D3">D3</option>
                                    <option value="S1">S1</option>                                                                                                            
                                </datalist>
                                <pre id="example">example: SMA IPA, SMK Multimedia, S1 Informatika</pre>
                                <div className="input-icon"><i className="fa fa-building" /></div>
                            </div>
                        </div>

                        <p className="pRegist" id="validate">{this.state.meetErr} {this.state.purposeErr}</p>
                        <div>
                            <div className="input-group input-group-icon" style={{ paddingTop: 20, paddingLeft: 25, width: 520 }}>
                                {this.state.formType === "Non Operational Form"?
                                <select id="selectCur" className="select-input" name="purpose" value={this.state.purpose} onChange={e => this.change(e)} onBlur =  {e => this.onBlur(e)} style = {{border:this.state.purposeErr!==""?"1.5px solid #ff1100ad": ""}}>
                                    <option hidden>Purpose Here*</option>
                                    <option value="Interview with HR" >Interview with HR</option>
                                    <option value="Interview with User" >Interview with User</option>
                                </select>:
                                <select id="selectCur" name="purpose" className="select-input" value={this.state.purpose} onBlur =  {e => this.onBlur(e)} onChange={e => this.change(e)} style={{border:this.state.purposeErr!==""?"1.5px solid #ff1100ad": ""}}>
                                    <option hidden>Purpose Here*</option>
                                    <option value="FGD and Interview (Customer Care)" >FGD and Interview (Customer Care)</option>
                                    <option value="Interview with HR" >Interview with HR</option>
                                    <option value="Interview with User" >Interview with User</option>
                                    <option value="Interview with Vice President (VP)" >Interview with Vice President (VP)</option>
                                    <option value="Test and FGD" >Test and FGD</option>
                                    <option value="Test and Interview" >Test and Interview</option>
                                    <option value="Written Test" >Written Test</option>
                                </select>
                                }   
                                <select className="select-input" id="selectCur" name="meet" value={this.state.meet} onChange={e => this.change(e)} onBlur =  {e => this.onBlur(e)} style = {{border:this.state.meetErr!==""?"1.5px solid #ff1100ad": "",width:"45%"}}>
                                    <option hidden>You would to see*</option>
                                {
                                    this.state.interviewers.map(el => <option value={el} key = {el}> {el} </option>)
                                }
                                </select>
                            </div>
                        </div>
                        {this.state.formType === "Non Operational Form"?
                        <div>
                            <p className="pRegist" id="validate" >{this.state.positionErr}</p>
                            <div className="input-group input-group-icon" style={{ paddingTop: 20 }}>
                                <select id="selectCur" name="position" className="select-input" value={this.state.position} onChange={e => this.change(e)} onBlur =  {e => this.onBlur(e)} style={{border:this.state.positionErr!==""?"1.5px solid #ff1100ad": ""}}>
                                    <option hidden>Position Apply*</option>
                                    <option value="Accounting" >Accounting</option>
                                    <option value="Android Developer" >Android Developer</option>
                                    <option value="AR / AP Specialist" >AR / AP Specialist</option>
                                    <option value="Asset Management Specialist" >Asset Management Specialist</option>
                                    <option value="Banner Designer Specialist" >Banner Designer Specialist</option>
                                    <option value="Brand Specialist" >Brand Specialist</option>
                                    <option value="Business Acquisition" >Business Acquisition</option>
                                    <option value="Business Development" >Business Development</option>
                                    <option value="Business Head" >Business Head</option>
                                    <option value="Business Intelligence" >Business Intelligence</option>
                                    <option value="Business Partnership & Operation - Category" >Business Partnership &amp; Operation - Category </option>
                                    <option value="Business Promotion Strategist" >Business Promotion Strategist</option>
                                    <option value="Category Administrator" >Category Administrator</option>
                                    <option value="Category Development" >Category Development</option>
                                    <option value="Category Growth Lead" >Category Growth Lead</option>
                                    <option value="Community Lead" >Community Lead</option>
                                    <option value="Community Specialist" >Community Specialist</option>
                                    <option value="Content Lead" >Content Lead</option>
                                    <option value="Copywriter" >Copywriter</option>
                                    <option value="Corporate Banking Relation" >Corporate Banking Relation</option>
                                    <option value="Corporate Finance Analyst" >Corporate Finance Analyst</option>
                                    <option value="Creative Producer" >Creative Producer</option>
                                    <option value="Creative Scriptwriter" >Creative Scriptwriter</option>
                                    <option value="Customer Intelligence Specialist" >Customer Intelligence Specialist</option>
                                    <option value="Data Analyst" >Data Analyst</option>
                                    <option value="Data Engineer" >Data Engineer</option>
                                    <option value="Data Scientist" >Data Scientist</option>
                                    <option value="Database Administrator" >Database Administrator</option>
                                    <option value="Digital Marketing Specialist" >Digital Marketing Specialist</option>
                                    <option value="Digital Implementer" >Digital Implementer</option>
                                    <option value="Email Marketing Specialist" >Email Marketing Specialist</option>
                                    <option value="Employee & Expatriate Management" >Employee &amp; Expatriate Management</option>
                                    <option value="Engineering Manager" >Engineering Manager</option>
                                    <option value="Event Marketing Specialist" >Event Marketing Specialist</option>
                                    <option value="Escrow Specialist" >Escrow Specialist</option>
                                    <option value="Executive Assistant" >Executive Assistant</option>
                                    <option value="Front End Designer" >Front End Designer</option>
                                    <option value="Front End Engineer" >Front End Engineer</option>
                                    <option value="General Affair Admin" >General Affair Admin</option>
                                    <option value="Graphic Designer" >Graphic Designer</option>
                                    <option value="Graphic Designer Intern" >Graphic Designer Intern</option>
                                    <option value="Head of Creative" >Head of Creative</option>
                                    <option value="Head of Community" >Head of Community</option>
                                    <option value="Head of Media Strategist" >Head of Media Strategist</option>
                                    <option value="Head of Operational" >Head of Operational</option>
                                    <option value="Head of Social Media" >Head of Social Media</option>
                                    <option value="HR Data & Policy" >HR Data &amp; Policy</option>
                                    <option value="HR Administrator" >HR Administrator</option>
                                    <option value="Illustrator" >Illustrator</option>
                                    <option value="Internal Auditor" >Internal Auditor</option>
                                    <option value="Intern Business Development" >Intern Business Development</option>
                                    <option value="Intern Category Development" >Intern Category Development</option>
                                    <option value="Intern Content Writer" >Intern Content Writer</option>
                                    <option value="Intern Finance" >Intern Finance</option>
                                    <option value="Intern HR" >Intern HR</option>
                                    <option value="Intern Motion Graphic" >Intern Motion Graphic</option>
                                    <option value="Intern Official Store" >Intern Official Store</option>
                                    <option value="Intern Procurement" >Intern Procurement</option>
                                    <option value="Intern PR & Event" >Intern PR &amp; Event</option>
                                    <option value="Intern Social Media" >Intern Social Media</option>
                                    <option value="Intern Software Engineer" >Intern Software Engineer</option>
                                    <option value="Intern Tax" >Intern Tax</option>
                                    <option value="Intern Quality Assurance" >Intern Quality Assurance</option>
                                    <option value="iOS Developer" >iOS Developer</option>
                                    <option value="IT Security Analyst" >IT Security Analyst</option>
                                    <option value="IT Support Specialist" >IT Support Specialist</option>
                                    <option value="Legal Admin" >Legal Admin</option>
                                    <option value="Legal Specialist" >Legal Specialist</option>
                                    <option value="Motion Graphic Designer" >Motion Graphic Designer</option>
                                    <option value="Organizational Development" >Organizational Development</option>
                                    <option value="Official Store Administrator" >Official Store Administrator</option>
                                    <option value="People Development" >People Development</option>
                                    <option value="Performance Management" >Performance Management</option>
                                    <option value="Procurement Specialist" >Procurement Specialist</option>
                                    <option value="Procurement Infrastructure" >Procurement Infrastructure</option>
                                    <option value="Product Analyst" >Product Analyst</option>
                                    <option value="Product Manager" >Product Manager</option>
                                    <option value="Product Owner" >Product Owner</option>
                                    <option value="PR Specialist" >PR Specialist</option>
                                    <option value="Recruitment Specialist" >Recruitment Specialist</option>
                                    <option value="Risk Specialist" >Risk Specialist</option>
                                    <option value="SAP Developer" >SAP Developer</option>
                                    <option value="Senior Banking Relationship" >Senior Banking Relationship</option>
                                    <option value="Senior Accounting Specialist" >Senior Accounting Specialist</option>
                                    <option value="Senior Payroll Specialist" >Senior Payroll Specialist</option>
                                    <option value="Senior Software Engineer" >Senior Software Engineer</option>
                                    <option value="Search Engine Marketing (SEM) Specialist" >Search Engine Marketing (SEM) Specialist</option>
                                    <option value="Search Engine Optimization (SEO) Specialist" >Search Engine Optimization (SEO) Specialist</option>
                                    <option value="Senior Business Development" >Senior Business Development</option>
                                    <option value="Senior Data Scientist" >Senior Data Scientist</option>
                                    <option value="Senior General Affair Specialist" >Senior General Affair Specialist</option>
                                    <option value="Senior Media Planner Specialist" >Senior Media Planner Specialist</option>
                                    <option value="Senior Network Engineer" >Senior Network Engineer</option>
                                    <option value="Site Reliability Engineer" >Site Reliability Engineer</option>
                                    <option value="Social Media Community Specialist" >Social Media Community Specialist</option>
                                    <option value="Software Development Engineer In-Tes" >Software Development Engineer In-Tes</option>
                                    <option value="Software Engineer" >Software Engineer</option>
                                    <option value="Software Quality Assurance Engineer" >Software Quality Assurance Engineer</option>
                                    <option value="System Administrator" >System Administrator</option>
                                    <option value="Tax Lead" >Tax Lead</option>
                                    <option value="Technical Architect" >Technical Architect</option>
                                    <option value="Talent Management" >Talent Management</option>
                                    <option value="Transaction Officer" >Transaction Officer</option>
                                    <option value="UI Designer" >UI Designer</option>
                                    <option value="UX Designer" >UX Designer</option>
                                    <option value="UX Researcher" >UX Researcher</option>
                                    <option value="Video" >Video Editor</option>
                                    <option value="Videographer" >Videographer</option>
                                    <option value="Video Producer" >Video Producer</option>
                                    <option value="Wordpress Engineer" >Wordpress Engineer</option>
                                </select>
                                <select id="selectCur" name="infoJob" value={this.state.infoJob} onChange={e => this.change(e)} onBlur =  {e => this.onBlur(e)} style = {{border:this.state.infoJobErr!==""?"1.5px solid #ff1100ad": ""}}>
                                    <option hidden>Information about Job from*</option>
                                    <option value="Website tokopedia" >Website Tokopedia</option>
                                    <option value="JobStreet" >JobStreet</option>
                                    <option value="Job Fair" >Job Fair</option>
                                    <option value="Campus Career Center" >Campus Career Center</option>
                                    <option value="LinkedIn" >LinkedIn</option>
                                    <option value="Friend Referral" >Friends Referral</option>
                                </select>
                            </div>
                        </div>
                        :
                        <div style={{position: "relative", left: 22 }}>
                            <p className="pRegist" id="validate" >{this.state.positionErr}{this.state.infoJobErr}</p>
                            <div className="input-group input-group-icon" style={{ paddingTop: 20 }}>
                                <select id="selectCur" name="position" className="select-input" value={this.state.position} onBlur =  {e => this.onBlur(e)} onChange={e => this.change(e)} style = {{border:this.state.positionErr!==""?"1.5px solid #ff1100ad": ""}}>
                                    <option hidden>Position Apply*</option>
                                    <option value="Call Center Officer" >Call Center Officer</option>
                                    <option value="Customer Care Officer" >Customer Care Officer</option>
                                    <option value="Customer Care Officer - Call Center" >Customer Care Officer - Call Center</option>
                                    <option value="Customer Care Officer - Resolution" >Customer Care Officer - Resolution</option>
                                    <option value="Customer Care Officer - Social Media" >Customer Care Officer - Social Media</option>
                                    <option value="Transaction Officer" >Executive Assistant</option>
                                </select>
                                <select id="selectCur" name="infoJob" value={this.state.infoJob} onChange={e => this.change(e)} onBlur =  {e => this.onBlur(e)}  style = {{border:this.state.infoJobErr!==""?"1.5px solid #ff1100ad": ""}}>
                                    <option hidden>Information about Job from*</option>
                                    <option value="Website tokopedia" >Website Tokopedia</option>
                                    <option value="JobStreet" >JobStreet</option>
                                    <option value="Job Fair" >Job Fair</option>
                                    <option value="Campus Career Center" >Campus Career Center</option>
                                    <option value="LinkedIn" >LinkedIn</option>
                                    <option value="Friend Referral" >Friends Referral</option>
                                    <option value="Other" >Other</option>                                    
                                </select>
                            </div>
                        </div>
                        }
                    </div>


                    <div className="row" >
                        <p className="pRegist" id="validate" >{this.state.acquaintancesErr}</p>
                        <p  style={{ textAlign: 'center' }}>have any acquaintances in PT. Tokopedia?*</p>
                        <div className="input-group" style={{ paddingLeft: 265}}>
                            <input
                                name="acquaintances"
                                value="yes"
                                id="acquaintances-yes"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label id="selectCur" htmlFor="acquaintances-yes">YES</label>
                            <input
                                name="acquaintances"
                                value="no"
                                id="acquaintances-no"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label id="selectCur" htmlFor="acquaintances-no">NO</label>
                        </div>
                        {this.state.acquaintances === "yes" ? this.showNew = true : this.showNew = false}
                        {/* Munculin kalo Yes -----------------------------------------------*/}
                        <div className="row" style={{ display: this.showNew ? 'block' : 'none' }}>
                            <p id="validate">{this.state.acquaintanceNameErr}</p>
                            <div className="input-group input-group-icon">
                                <input
                                    placeholder="Acquaintance Name *"
                                    type="text"
                                    name="acquaintanceName"
                                    value={this.state.acquaintanceName}
                                    style = {{border:this.state.acquaintanceNameErr!==""?"1.5px solid #ff1100ad": ""}}
                                    onChange={e => this.change(e)}
                                    onBlur =  {e => this.onBlur(e)}
                                />
                                <p className="pRegist">Your Acquaintance name</p>
                                <div className="input-icon"><i className="fa fa-user" /></div>
                            </div>

                            <p id="validate">{this.state.relationshipErr}</p>
                            <div className="input-group input-group-icon" style={{ paddingTop: 20, left: 215, width: 640 }}>

                                <select name="relationship" value={this.state.relationship} onChange={e => this.change(e)} onBlur =  {e => this.onBlur(e)} style = {{border:this.state.relationshipErr!==""?"1.5px solid #ff1100ad": ""}} >
                                    <option hidden >Relationship with Nakama *</option>
                                    <option value="College Friends">College Friends</option>
                                    <option value="Colleagues">Colleagues</option>
                                    <option value="Spouse (Husband/Wife)">Spouse (Husband/Wife)</option>
                                    <option value="Brother/Sister">Brother/Sister</option>
                                    <option value="Parents">Parents</option>
                                    <option value="Other">Other</option>
                                </select>
                                {this.state.relationship === "Other" ? this.show = true : this.show = false}

                            </div>

                            <div className="input-group input-group-icon" style={{ display: this.show ? 'block' : 'none' }} >
                                <input
                                    placeholder="Relation..."
                                    name="temp"
                                    type="text"
                                    value={this.state.temp}
                                    onChange={e => this.change(e)}
                                    onBlur =  {e => this.onBlur(e)}
                                />
                                <p  className="pRegist" style={{position: "relative", right: 50}}>What is your relation?</p>
                                <div className="input-icon"><i className="fa fa-user-o" /></div>
                            </div>
                        </div>

                        <div className="row" style={{ paddingBottom: 70 }}>
                            <p className="pRegist" id="validate" >{this.state.timeErr}</p>
                            <p style={{ textAlign: 'center' }}>Scheduled time*</p>
                            <div style={{paddingLeft:15}}>
                            <div className="input-group" style={{ display: "flex", justifyContent: "center", marginLeft: 85 }}>
                                <div className="col-third" style={{ width: 78 }}>
                                    <input
                                        name="timeHH"
                                        placeholder="HH"
                                        type="number"
                                        min="0"
                                        max="12"
                                        value={this.state.timeHH}
                                        style = {{border:this.state.timeErr!==""?"1.5px solid #ff1100ad": "", width: 72}}
                                        onChange={e => this.change(e)}
                                        onBlur =  {e => this.onBlur(e)}
                                    />
                                </div>
                                <span id="colon">:</span>
                                <div className="col-third" style={{ width: 80 }}>
                                    <input
                                        name="timeMM"
                                        placeholder="MM"
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={this.state.timeMM}
                                        style = {{border:this.state.timeErr!==""?"1.5px solid #ff1100ad": "", width: 72}}
                                        onChange={e => this.change(e)}
                                        onBlur =  {e => this.onBlur(e)}
                                    />
                                </div>
                                <div className="col-third">
                                    <select name="timeMA" value={this.state.timeMA} onChange={e => this.change(e)}>
                                        <option value="AM" >AM</option>
                                        <option value="PM" >PM</option>
                                    </select>
                                </div>
                            </div>
                            <pre id="example" style={{ width: 320, position: "relative", left: 165 }}>example: 07:00 AM || 12:30 PM</pre>
                            </div>
                        </div>
                    </div>

                    <p id="validate">{this.state.statErr}</p>
                    <div className="input-group input-group-icon">

                        <p>My Statement</p>
                        <div className="checkB">
                            <label id="page4lbl">
                                <input id="checked"
                                    type="checkbox"
                                    name="isGoing"

                                    onClick={this.handleInputChange.bind(this)}
                                />
                                <span className="checkmark"  style = {{border:this.state.statErr!==""?"1.5px solid #ff1100ad": "" ,  cursor: "pointer"}}></span>
                                I hereby declare that this information I have made in truth and can be justified as it should</label>
                        </div>

                        <div className= "regist-button">
                            <button type="submit" className="btn btn-main">Finish</button>
                            <button type="button" className="btn btn-main" onClick={this.back}>Back</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

