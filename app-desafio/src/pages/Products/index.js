import React, { useState, useEffect } from 'react';
import ZeSmallLogo from '../../assets/small-logo.svg';
import ReactDOM from 'react-dom';
import './index.css';

function Products() {
  return (          
      <>
          {/* Header */}
          <div className="header">
              <a href="#" className="logo"><img className="imageLogoSmall" src={ ZeSmallLogo } alt="Logo Zé Delivery"/></a>
              <div className="header-right">
                  <a className="active" href="#">Entrar</a>                  
              </div>
          </div>

          {/* Produtos */}
          <div className="productList">
            
          </div>

         
      </>
  );
}

export default Products;