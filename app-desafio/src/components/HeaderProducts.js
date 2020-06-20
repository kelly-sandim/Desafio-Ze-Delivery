import React, { Component } from "react";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import { findDOMNode } from "react-dom";
import ZeSmallLogo from '../assets/small-logo.svg';


class HeaderProducts extends Component {
    
    render() {      
      return (
        <header className="header">
            <div className="container">
                <a href="#" className="logo"><img className="imageLogoSmall" src={ ZeSmallLogo } alt="Logo Zé Delivery"/></a>                
                
            </div>
        </header>

            
      );
    }
  }
  
  export default HeaderProducts;
