import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';


class notUser extends Component {
    direct(){
        window.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/register"
    }
    render() {
        const styles = {
            image: {
                padding: 10,
                width: 600,
                height: 200
            }
        }
        

        return (
                <div>
                    <div className="row1">
                        <h1>WELCOME TO PT.TOKOPEDIA</h1>
                        <h2 style={{color:"red", textAlign:"center"}}>We are sorry you're not a user please Regist your email First</h2>
                    

                    <button 
                        type="button" 
                        className="btn"
                        onClick={this.direct}
                        >Back</button>
                    
                    </div>
                </div>
          
        )
    }
}

export default notUser;