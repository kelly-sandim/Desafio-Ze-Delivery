import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HeaderProducts from '../../components/HeaderProducts';
import Footer from '../../components/Footer';


function Products() {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        let productListJSON = localStorage.getItem('productListJSON');
        productListJSON = JSON.parse(productListJSON);
        let originalProducts = [];    
        productListJSON.map(product => {
            originalProducts.push({ id: product.id, name: product.title, price: product.productVariants[0].price, image: product.images[0].url });            
        });        
        setProducts(originalProducts);
        
    }, []);

        return (          
            <>
                    <HeaderProducts />
                    
                    {/* Produtos */}
                    <div className="productList">                
                        {
                            products.map(product => {
                                return (
                                    <div className="card">                                
                                        <img src={ product.image } alt="Avatar" style={{width:"100%"}} />
                                        <div className="container">
                                            <h4><b>{ product.name }</b></h4>
                                            <p>{ product.price }</p>
                                        </div>
                                    </div>
                                )
                            })
                        }                 
                    </div>
                    
                    <Footer /> 
                              
            </>
        );
}
export default Products;