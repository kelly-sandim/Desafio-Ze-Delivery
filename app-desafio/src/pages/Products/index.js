import React, { useState, useEffect } from 'react';
import ZeSmallLogo from '../../assets/small-logo.svg';
import ReactDOM from 'react-dom';
import './index.css';

function Products() {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        let productListJSON = localStorage.getItem('productListJSON');
        productListJSON = JSON.parse(productListJSON);        
        setProducts(productListJSON);
        
    }, []);

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
                {
                    products.map(product => {
                        return (
                            <div className="card">                                
                                <img src={ product.images[0].url } alt="Avatar" style={{width:"100%"}} />
                                <div className="container">
                                    <h4><b>{ product.title }</b></h4>
                                    <p>{ product.productVariants[0].price }</p>
                                </div>
                            </div>
                        )
                    })
                }                 
            </div>

            
      </>
  );
}

export default Products;