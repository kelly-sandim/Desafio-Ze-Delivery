import React from "react";
import ZeLogo from '../assets/white-logo.svg';

const HeaderHome = props => {
    return (        
        <div className="header">
            <div className="header-left">
                <a href="#" className="logo"><img className="imageLogo" src={ ZeLogo } alt="Logo Zé Delivery"/></a>
            </div>
            <div className="header-right">
                <a className="active" href="#">Entrar</a>                  
            </div>
        </div>
    );
};

export default HeaderHome;