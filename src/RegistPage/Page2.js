import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';


class Page2 extends Component{
    constructor(props){
        super(props);
        this.change = this.change.bind(this);   
        // this.otherPop = this.otherPop.bind(this);
        // this.onchange = this.onchange.bind(this);
        this.show = false;
        this.state={
            acquaintanceName:"",
            relationship:"",
            temp:"",
            acquaintanceNameErr:"",
            relationshipErr:""
        }

    }
   

    change = e => {
        
        this.setState({
            [e.target.name]: e.target.value
        });
        

    };


    validate = () => {
        let isError = false;
        const errors = {
            acquaintanceNameErr:"",
            relationshipErr:""
        };
    

        if (this.state.acquaintanceName === "") {
          isError = true;
          errors.acquaintanceNameErr = "the acquaintance Name column is empty.";
        } 
        if (this.state.relationship === "" ) {
            isError = true;
            errors.relationshipErr = "the relationship column is empty.";
        }
        if (this.state.temp==="" && this.state.relationship==="Other" ) {
            isError = true;
            errors.relationshipErr = "the relationship column is empty.";
        }
        window.scrollTo(0, 0);
        this.setState(errors);
        return isError;
    };

    onSubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
          this.state.relationship = this.state.temp;
          this.setState({
            temp:"",
            acquaintanceNameErr:"",
            relationshipErr:""
          }),
        
          window.location.href= 'page3';

        }   
         
    };

    // onchange = e =>{
    //     this.otherPop();
    //     this.change(e);
        
    // }

    
    render(){
      
        return(
            <div>
         <form>
            <div className="row">
                <h4>Non Operational Registration Form  PT.Tokopedia</h4>
                <p style={{ textAlign: 'center' }}>Your email address (value...) will be recorded when you submit this form</p>
                <h5 style={{ paddingBottom: 25 }}>*required</h5>
                <p id="validate">{this.state.acquaintanceNameErr}</p>
                <div className="input-group input-group-icon">
                    <input 
                    placeholder="Acquaintance Name *" 
                    type="text"
                    name="acquaintanceName"
                    value={this.state.acquaintanceName}
                    onChange={e=>this.change(e)}
                    />
                    <p>Your Acquaintance name</p>
                    <div className="input-icon"><i className="fa fa-user" /></div>
            </div>

                   
                <div className="input-group input-group-icon" style={{ paddingTop: 20, left: 130 }}>
                <p id="validate">{this.state.relationshipErr}</p>
                    <select name="relationship" value={this.state.relationship} onChange={e=>this.change(e)} >
                        <option hidden >Relationship with Nakama *</option>
                        <option value="College Friends">College Friends</option>
                        <option value="Colleagues">Colleagues</option>
                        <option value="Spouse (Husband/Wife)">Spouse (Husband/Wife)</option>
                        <option value="Brother/Sister">Brother/Sister</option>
                        <option value="Parents">Parents</option>
                        <option value="Other">Other</option>
                    </select>
                    {this.state.relationship==="Other"?this.show=true:this.show=false}
  
                </div>

                <div className="input-group input-group-icon" style={{display: this.show ? 'block' : 'none' }} >
                    <input 
                    placeholder="Relation..." 
                    name="temp" 
                    type="text" 
                    value={this.state.temp} 
                    onChange={e=>this.change(e)}
                    />
                    <p>What is your relation?</p>
                    <div className="input-icon"><i className="fa fa-user-o" /></div>
                </div>

                <p id="page">page 2 of 4</p>
                <Link to="/page3" > <button type="button" className="btn" onClick={e=>this.onSubmit(e)}>Next</button></Link>
               <Link to="/page1"> <button type="button" className="btn" >Back</button></Link>

            </div>
            </form>
           </div>
        )
    }

}


export default Page2
