import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import Page1 from './Page1';


class Page3 extends Component{
    constructor(props){
        super(props);
        this.change = this.change.bind(this)
        
        this.state={
            referralName:"",
            referralNameErr:""
        }
    }


    change (e){
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validate() {
        let isError = false;
        const errors = {
            referralNameErr:""
        };
    

        // if (this.state.referralName === "") {
        //   isError = true;
        //   errors.referralNameErr= "the referral name column is empty.";
        //   window.scrollTo(0, 0);
        // }
        this.setState(errors);
        return isError;
    };

    onSubmit (e)  {
        
        e.preventDefault();
        const err = this.validate();

        if (!err) {    
          this.setState({
            referralNameErr:""
          },
        //   console.log(this.state.referralName)
        window.location.href= 'page4'
        );
             
        }
     
        
        
       
    };

    render(){
       
        return(
            <div>
                     <form onSubmit={ e=>this.onSubmit(e)}>
                      <div className="row">
                        <h4>Non Operational Registration Form  PT.Tokopedia</h4>
                        <p style={{textAlign:'center'}}>Your email address (value...) will be recorded when you submit this form</p>
                        <h5 style={{paddingBottom:25}}>*required</h5>
                        <p id="validate">{this.state.referralNameErr}</p>
                        <div className="input-group input-group-icon">
                          <input 
                          placeholder="Referral Name" 
                          type="text"
                          name="referralName"
                          value={this.state.referralName}
                          onChange={e=>this.change(e)}
                          />
                          <p>Mention the name of your friend who refer you.</p>
                          <div className="input-icon"><i className="fa fa-user" /></div>
                        </div>
                       
                        <p id="page">page 3 of 4</p>
                       <button type="submit" className="btn" >Next</button>
                        <Link to={this.state.referralName==="yes" ? "page2":"page1"}> <button type="button" className="btn" >Back</button></Link>
                      </div>
                    
                    </form>
                    
           </div>
        )
    }

}


export default Page3
