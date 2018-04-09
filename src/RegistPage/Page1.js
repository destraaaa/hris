import React, { Component } from 'react';
// import Page3 from './Page3';



export default class Page1 extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);



        this.state = {
            fullName: "",
            fullNameErr: "",
            nickName: "",
            phoneNumber: "",
            phoneNumberErr: "",
            email: "",
            emailErr: "",
            school: "",
            major: "",
            GPA: "",
            purpose: "",
            purposeErr: "",
            meet: "",
            meetErr: "",
            position: "",
            positionErr: "",
            acquaintances: "",
            acquaintancesErr: "",
            timeMM: "",
            timeHH: "",
            timeMA: "AM",
            timeErr: "",
            infoJob: ""
        };
    }




    // static childContextTypes ={
    //     checked: this.state.acquaintances
    // } 


    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    validate() {
        let isError = false;
        const errors = {
            fullNameErr: "",
            phoneNumberErr: "",
            emailErr: "",
            purposeErr: "",
            meetErr: "",
            positionErr: "",
            acquaintancesErr: "",
            timeErr: ""
        };


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
        if (this.state.timeHH === "" || this.state.timeMM === "" || this.state.timeMA === "") {
            isError = true;
            errors.timeErr = "the time column is empty.";
        }
        if (parseInt(this.state.timeHH) < 0 || parseInt(this.state.timeHH) > 24) {
            isError = true;
            errors.timeErr = "the time is invalid";
        }
        if (parseInt(this.state.timeMM) < 0 || parseInt(this.state.timeMM) > 59) {
            isError = true;
            errors.timeErr = "the time is invalid";
        }
        this.state.timeMM > 24
        window.scrollTo(0, 0);


        this.setState(errors);

        return isError;
    };

    onSubmit(e) {
        e.preventDefault();
        // this.props.onSubmit(this.state);
        const err = this.validate();
        if (!err) {
            // clear form
            this.setState({
                fullNameErr: "",
                phoneNumberErr: "",
                emailErr: "",
                purposeErr: "",
                meetErr: "",
                positionErr: "",
                acquaintancesErr: "",
                timeErr: "",
                infoJob: ""
            });


            this.state.acquaintances === "yes" ? window.location.href = '/register/page2' : window.location.href = '/register/page3'


        }


    };


    render() {
        return (
            <div>
                <form>
                    <div className="row">
                        <h4>Non Operational Registration Form  PT.Tokopedia</h4>
                        <h5>*required</h5>

                        <p className="pRegist" id="validate" >{this.state.fullNameErr}</p>
                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Full Name*"
                                type="text"
                                name="fullName"
                                value={this.state.fullName}
                                onChange={e => this.change(e)} />
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
                                placeholder="phone Number*"
                                type="text"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={e => this.change(e)}
                            />
                            <p className="pRegist" >How can we contact you?</p>
                            <div className="input-icon"><i className="fa fa-phone-square" /></div>
                        </div>

                        <p className="pRegist" id="validate" >{this.state.emailErr}</p>
                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Email Adress*"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={e => this.change(e)}
                            />
                            <p className="pRegist" >Input a valid email address.</p>
                            <div className="input-icon"><i className="fa fa-envelope" /></div>
                        </div>

                        <div className="input-group input-group-icon">
                            <input
                                placeholder="University / School"
                                type="text" name="school"
                                value={this.state.school}
                                onChange={e => this.change(e)}
                            />
                            <div className="input-icon"><i className="fa fa-building" /></div>
                        </div>

                        <div className="input-group input-group-icon">
                            <input
                                placeholder="Major/ Specialization"
                                type="text"
                                name="major"
                                value={this.state.major}
                                onChange={e => this.change(e)}
                            />
                            <div className="input-icon"><i className="fa fa-cogs" /></div>
                        </div>

                        <div className="input-group input-group-icon">
                            <input
                                placeholder="GPA"
                                type="text"
                                name="GPA"
                                value={this.state.GPA}
                                onChange={e => this.change(e)}
                            />
                            <div className="input-icon"><i className="fa fa-industry" /></div>
                        </div>

                        <p className="pRegist" id="validate">{this.state.meetErr} {this.state.purposeErr}</p>
                        <div className="input-group input-group-icon" style={{ paddingTop: 20, paddingLeft: 25, width: 520 }}>
                            <select name="purpose" value={this.state.purpose} onChange={e => this.change(e)}>
                                <option hidden>Purpose Here*</option>
                                <option value="Interview with HR" >Interview with HR</option>
                                <option value="Interview with User" >Interview with User</option>
                            </select>
                            <select name="meet" value={this.state.meet} onChange={e => this.change(e)}>
                                <option hidden>You would to see*</option>
                                <option value="Ms. Amanda" >Ms. Amanda</option>
                                <option value="Ms. Clarissa" >Ms. Clarissa</option>
                                <option value="Ms. Destiny" >Ms. Destiny</option>
                                <option value="Ms. Dyah Ayu" >Ms. Dyah Ayu</option>
                                <option value="Ms. Fitri Naviati" >Ms. Fitri Naviati</option>
                                <option value="Ms. Fitria Umami" >Ms. Fitria Umami</option>
                                <option value="Ms. Nadya" >Ms. Nadya</option>
                                <option value="Ms. Ruthnaomi" >Ms. Ruthnaomi</option>
                                <option value="Ms. Steffanie" >Ms. Steffanie</option>
                                <option value="Mr. Yoga" >Mr. Yoga</option>
                            </select>
                        </div>
                        <p className="pRegist" id="validate" >{this.state.positionErr}</p>
                        <div className="input-group input-group-icon" style={{ paddingTop: 20 }}>
                            <select name="position" value={this.state.position} onChange={e => this.change(e)}>
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
                            <select name="infoJob" value={this.state.infoJob} onChange={e => this.change(e)}>
                                <option hidden>Information about Job from</option>
                                <option value="Website tokopedia" >Website Tokopedia</option>
                                <option value="JobStreet" >JobStreet</option>
                                <option value="Job Fair" >Job Fair</option>
                                <option value="Campus Career Center" >Campus Career Center</option>
                                <option value="LinkedIn" >LinkedIn</option>
                                <option value="Friend Referral" >Friends Referral</option>
                            </select>
                        </div>
                    </div>


                    <div className="row" >
                        <p className="pRegist" id="validate" >{this.state.acquaintancesErr}</p>
                        <p className="pRegist" style={{ textAlign: 'center' }}>have any acquaintances in PT. Tokopedia?*</p>
                        <div className="input-group" style={{ paddingLeft: 265 }}>
                            <input
                                name="acquaintances"
                                value="yes"
                                id="acquaintances-yes"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label htmlFor="acquaintances-yes">YES</label>
                            <input
                                name="acquaintances"
                                value="no"
                                id="acquaintances-no"
                                type="radio"
                                onChange={e => this.change(e)}
                            />
                            <label htmlFor="acquaintances-no">NO</label>
                        </div>
                    </div>

                    <div className="row">
                        <p className="pRegist" id="validate" >{this.state.timeErr}</p>
                        <p className="pRegist" style={{ textAlign: 'center' }}>Scheduled time*</p>
                        <div className="input-group" style={{ display: "flex", justifyContent: "center", marginLeft: 75 }}>
                            <div className="col-third" style={{ width: 70 }}>
                                <input
                                    name="timeHH"
                                    placeholder="HH"
                                    type="number"
                                    min="0"
                                    max="12"
                                    style={{ width: 72 }}
                                    value={this.state.timeHH}
                                    onChange={e => this.change(e)}
                                />
                            </div>

                            <div className="col-third" style={{ width: 78 }}>
                                <input
                                    name="timeMM"
                                    placeholder="MM"
                                    type="number"
                                    min="0"
                                    max="59"
                                    style={{ width: 72 }}
                                    value={this.state.timeMM}
                                    onChange={e => this.change(e)}
                                />
                            </div>
                            <div className="col-third">
                                <select name="timeMA" value={this.state.timeMA} onChange={e => this.change(e)}>
                                    <option value="AM" >AM</option>
                                    <option value="PM" >PM</option>
                                </select>
                            </div>
                        </div>

                        <p className="pRegist" id="page">page 1 of 4</p>

                        <button type="button" className="btn" onClick={e => this.onSubmit(e)}>Next</button>



                    </div>

                </form>


            </div>
        );
    }
}

