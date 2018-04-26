/* global gapi */
import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Cookies from 'js-cookie';
// import {PostData} from"./PostData";   
// import {GoogleLogout} from 'react-google-login';


// const responseGoogle = (response) => {
//     console.log(response);
//   }

// const logout = (response)=> {
//     console.log(response)
// }
var name = {
    userName: Cookies.get("__hrnu")    
}
class HeaderLinks extends Component{

    logOut(){
        // localStorage.removeItem("auth");
        // localStorage.removeItem("name");
        Cookies.remove('__hrid', { path: '/' })
        Cookies.remove('__hrnu', { path: '/' })        
        // window.location.href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/register"
        window.location.href="/register"
        
    }
    // componentDidMount () {
    //     const script = document.createElement("script");
    //     console.log("this script")
    //     script.src = "https://apis.google.com/js/platform.js?onload=onLoadCallback";
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);

    //     window.onLoadCallback = function(){
    //         console.log("this window callback")
                
    //             gapi.auth2.init({
    //                 client_id: '667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com'
                 
    //             });
    //           }
    // }
    

    // init() {
    //     gapi.load('auth2', function() { 
    //         client_id:'667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com'
    //       
    //   })
    // }
    // signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function () {
    //       console.log('User signed out.');
    //     });
    //   }

    // componentDidMount() {
    //     gapi.signin2.render('g-signin2', {
    //       'scope': 'https://www.googleapis.com/auth/plus.login',
    //       'width': 200,
    //       'height': 50,
    //       'longtitle': true,
    //       'theme': 'dark',
    //       'onsuccess': this. onSignIn
    //     });  
        
    //   }
    // onSignIn(googleUser) {
    //     console.log("this onsignin")
    //     // Useful data for your client-side scripts:
    //     var profile = googleUser.getBasicProfile();
    //     console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    //     console.log('Full Name: ' + profile.getName());
    //     console.log('Given Name: ' + profile.getGivenName());
    //     console.log('Family Name: ' + profile.getFamilyName());
    //     console.log("Image URL: " + profile.getImageUrl());
    //     console.log("Email: " + profile.getEmail());
    
    //     // The ID token you need to pass to your backend:
    //     var id_token = googleUser.getAuthResponse().id_token;
    //     console.log("ID Token: " + id_token);
    // };
        // window.onLoadCallback = function(){
        // gapi.auth2.init({
        //     client_id: '667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com'
        //   });
//     constructor(props) {
//         super(props);
//            this.state = {
//         //    loginError: false,
//         redirectToReferrer: false
//     };
//     this.signup = this.signup.bind(this);
//     }

//     signup (res) {
//         let postData;

//         PostData('signup',postData).then((res)=>
//     {
//         let responseJson = res;
//         if(responseJson.userData){
//             sessionStorage.setItem('userData',JSON.stringify(responseJson));
//             this.setState({redirectToReferrer:true});
//         }
//     }
//     )
//         // postData = {
//         //     name: res.w3.ig,
//         //     provider: type,
//         //     email: res.w3.U3,
//         //     provider_id: res.El,
//         //     token: res.Zi.access_token,
//         //     provider_pic: res.w3.Paa
//         //   };

//         if (postData) {
//         PostData('signup', postData).then((result) => {
//             let responseJson = result;
//             sessionStorage.setItem("userData", JSON.stringify(responseJson));
//             this.setState({redirect: true});
//         });
//     }
// }
//     onSignIn(userProfile, accessToken) {
//         console.log(userProfile)
//     }
    
    // logout() {
    //     // this.googleAuth.signOut();
    //     console.log("user has been sign out")
    // }

//     responseGoogle (googleUser) {
//         var id_token = googleUser.getAuthResponse().id_token;
//         console.log({accessToken: id_token});
//         //anything else you want to do(save to localStorage)...
//       }



    render(){

        // const responseGoogle = (response) => {
        //     console.log("google console");
        //     console.log(response);
        //     this.signup(response);
        // }

        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <i className="fa fa-dashboard"></i>
                        <p className="hidden-lg hidden-md">Dashboard</p>
                    </NavItem>
                    <NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={2.5}>Another notifications</MenuItem>
                    </NavDropdown>
                    <NavItem eventKey={3} href="#">
                        <i className="fa fa-search"></i>
                        <p className="hidden-lg hidden-md">Search</p>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>{name.userName}</NavItem>
                    {/* <NavItem eventKey={1}> <div 
                            className="g-signin2"
                            data-onsuccess={this.onSignIn}
                            data-theme="dark"
                            buttonText="blbalbal"
                            style={{position:"relative", bottom:8}}
                            >
                            
                            </div>
                    </NavItem> */}
                    {/* <NavItem eventKey={1}>
                    <GoogleLogin
                        clientId="667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className = "g-signin2"
                        buttonText = ""
                        // type = "div"
                        style={{position:"relative", bottom:11, backgroundColor:"#fff"}}
                    />
                    </NavItem> */}
                    {/* <div style={{position:"relative", bottom:5, width:170}}>
                     <GoogleSignIn 
                          clientId="667718253087-qeek1sjq841eo473bi8sqq64evqo16ss.apps.googleusercontent.com"
                          width ="180"
                          height = "30"
                          buttonText = "Login"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                        //   ref={g => this.googleAuth = g}
                        //   onSuccess={this.onSignIn.bind(this)}
                     />
                     </div> */}
                    <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.1}>Action</MenuItem>
                        <MenuItem eventKey={2.2}>Another action</MenuItem>
                        <MenuItem eventKey={2.3}>Something</MenuItem>
                        <MenuItem eventKey={2.4}>Another action</MenuItem>
                        <MenuItem eventKey={2.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.5}>Separated link</MenuItem>
                    </NavDropdown>
                    {/* <NavItem eventKey={3} 
                    href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/register">Log out</NavItem> */}
                   
                    {/* <NavItem eventKey={3}>
                        <GoogleLogout 
                            buttonText="Log out"
                            onLogoutSuccess={logout}>
                        </GoogleLogout>
                    </NavItem> */}
                    <NavItem eventKey={3}onClick = {this.logOut}>Log out</NavItem>
                    
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
