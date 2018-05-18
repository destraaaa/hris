import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer" style={{paddingLeft:20 }}>
                <Grid>
                    {/* <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#pablo">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                   Blog
                                </a>
                            </li>
                            
                        </ul>
                        
                    </nav> */}
                    <p className="copyright pull-right">
                        &copy; {(new Date()).getFullYear()} <a  style={{color:"rgba(0, 255, 0, 0.651)"}} href="http://www.tokopedia.com">PT.Tokopedia</a>, made with love for Registration
                    </p>
                   
                </Grid>
            </footer>
		);
	}
}

export default Footer;
