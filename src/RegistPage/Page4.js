import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import Page1 from "./Page1"

class Page4 extends Component{
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          showNew:false,
          isGoing: false,
          statErr:""
        };
        this.next = this.next.bind(this);
        // this.handleInputChange = this.next.bind(this);  
    }

    handleInputChange (){
        this.setState({
            isGoing:!this.state.isGoing
        })
    };

    validate (){
        let isError = false;
        const errors = {
           statErr:""
        };
    

        if (this.state.isGoing === false) {
          isError = true;
          errors.statErr = "you haven't checked the statment yet.";
        }

        window.scrollTo(0, 0);
        this.setState(errors);
        return isError;
    };
    
    onSubmit (e){
        e.preventDefault();
        const err = this.validate();
        if (!err) {
          this.setState({
            statErr:""
          });
          {this.next()}   
        }   
        
    };
    next(){
        this.setState({
            show:false,
            showNew:true
        })
    }
   
    render(){
        // console.log(this.state.isGoing)
        return(
            <div>
                    <form >
                      <div className="row" style={{display:  this.state.show ? 'block' : 'none' }}>
                        <h4>Non Operational Registration Form  PT.Tokopedia</h4>
                        <p style={{textAlign:'center'}}>Your email address (value...) will be recorded when you submit this form</p>
                        <h5 style={{paddingBottom:5}}>*required</h5>
                        <div className="input-group input-group-icon">
                          <p>My Statement</p>
                           <p id="validate">{this.state.statErr}</p>
                          <div className="checkB">
                          <label id="page4lbl">
                          <input id="checked"
                            type="checkbox"
                            name="isGoing"
                            // checked={this.state.isGoing}
                            onClick={this.handleInputChange.bind(this)} 
                          />
                          <span className="checkmark"></span>
                          I hereby declare that this information I have made in truth and can be justified as it should</label>
                          </div>
                        </div>
                       
                        <p id="page">page 4 of 4</p>
                         <button type="button" className="btn" onClick={e=>this.onSubmit(e)}>Finish</button>
                        <Link to="/register/page3"> <button type="button" className="btn" >Back</button></Link>
                      </div>

                      <div className="row1" style={{display:  this.state.showNew ? 'block' : 'none' }}>
                        <h1>Thank you for the Registration</h1>
                        <h2 style={{color:"red", textAlign:"center"}}>please press continue button to enter the form</h2>
                       
                        <Link to="/register"><button 
                        type="button" 
                        className="btn"
                        style={{position:"relative", right:205}}
                        onClick={this.next}
                        >continue</button></Link>
                     </div>
                    </form>
                    
           </div>
        )
    }

}


export default Page4
