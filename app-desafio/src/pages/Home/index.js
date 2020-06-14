import React, { useState, useEffect } from 'react';
import ZeLogo from '../../assets/white-logo.svg';
import ReactDOM from 'react-dom';
import './index.css';

function Home() {
  return (          
      <>
          {/* Header */}
          <div className="header">
              <a href="#" className="logo"><img className="imageLogo" src={ ZeLogo } alt="Logo Zé Delivery"/></a>
              <div className="header-right">
                  <a className="active" href="#">Entrar</a>                  
              </div>
          </div>

          {/* Input */}
          <div className="inputCity">
            <input type="text"/>
          </div>

          {/* Footer */}
          <div className="footer">
            
          </div>
      </>
  );
}

export default Home;