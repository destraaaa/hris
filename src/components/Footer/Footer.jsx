import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer" style={{paddingLeft:20 }}>
                <Grid>
                    <p className="copyright pull-right">
                        &copy; {(new Date()).getFullYear()} <a  style={{color:"rgba(0, 255, 0, 0.651)"}} href="http://www.tokopedia.com">PT.Tokopedia</a>, made with love for Registration
                    </p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;
