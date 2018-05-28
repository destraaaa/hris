import React, { Component } from "react";

class notUser extends Component {
    direct(){
        window.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/register"
    }
    render() {
        return (
                <div>
                    <div className="row1">
                        <h1>WELCOME TO PT.TOKOPEDIA</h1>
                        <h2 style={{color:"red", textAlign:"center"}}>We are sorry you're not a user please use your valid email</h2>

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