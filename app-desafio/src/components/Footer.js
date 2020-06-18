import React, { Component } from "react";

const Footer = props => {
    return (        
        <div className="footerDiv">
            <div className="content">
                <div className="footer-grids">
                    <div className="footer one">
                        <h3>More About Company</h3>
                        <p> Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, 
                        sed quia consequuntur magni dolores eos qui 
                        ratione voluptatem sequi nesciunt.</p>
                        <p className="adam">- Patrick Victoria, CEO</p>
                        <div className="clear"></div>
                    </div>
                    <div className="footer two">
                        <h3>Keep Connected</h3>
                        <ul>
                            <li><a className="fb" href="#"><i></i>Like us on Facebook</a></li>
                            <li><a className="fb1" href="#"><i></i>Follow us on Twitter</a></li>
                            <li><a className="fb2" href="#"><i></i>Add us on Google Plus</a></li>
                            <li><a className="fb3" href="#"><i></i>Follow us on Dribbble</a></li>
                            <li><a className="fb4" href="#"><i></i>Follow us on Pinterest</a></li>
                        </ul>
                    </div>
                    <div className="footer three">
                        <h3>Contact Information</h3>
                        <ul>
                            <li>The company name <span>Lorem ipsum dolor,</span>Glasglow Dr 40 Fe 72.  </li>
                            <li>1234567890  </li>
                            <li><a href="mailto:info@example.com">contact@example.com</a> </li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="copy-right-grids">
                    <div className="copy-left">
                            <p className="footer-gd">© 2016 Simple Footer Widget. All Rights Reserved | Design by <a href="https://w3layouts.com/" target="_blank">W3layouts</a></p>
                    </div>
                    <div className="copy-right">
                        <ul>
                            <li><a href="#">Company Information</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>  
        </div>
    );
};

export default Footer;
