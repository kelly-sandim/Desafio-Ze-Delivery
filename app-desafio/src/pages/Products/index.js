import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../css/style.css';
import HeaderProducts from '../../components/HeaderProducts';
import Footer from '../../components/Footer';
import { CartProvider, useCart } from "react-use-cart";


function Page() {
    const [ products, setProducts ] = useState([]);
    const { addItem, inCart } = useCart();

    useEffect(() => {
        let productListJSON = localStorage.getItem('productListJSON');
        productListJSON = JSON.parse(productListJSON);
        let originalProducts = [];    
        productListJSON.map(product => {            
            originalProducts.push({ id: product.id, name: product.title, price: product.productVariants[0].price, image: product.images[0].url });            
        });        
        setProducts(originalProducts);
        
    }, []);

    function addDefaultSrc(ev) {
      ev.target.src = 'http://www.esquadriasesal.com.br/wp-content/uploads/2019/07/imagem-nao-disponivel-esal-esquadrias.jpg';
    }
    
    return (          
        <>       
            {/* Produtos */}
            <div className="productList">                
                {
                    products.map(product => {
                        const alreadyAdded = inCart(product.id);

                        return (
                            <div className="card" key={ product.id }>                                
                                <img src={ product.image } onError={e => addDefaultSrc(e)} alt="Avatar" style={{width:"100%"}} />
                                <div className="container">
                                    <h4 className="productName"> { product.name } </h4>
                                    <p className="productPrice">R$ { (Math.round(product.price * 100) / 100).toFixed(2) }</p>
                                </div>
                                <button className="cartButton" onClick={() => addItem(product)}>
                                    {alreadyAdded ? "Adicionar novamente" : "Adicionar ao Carrinho"}
                                </button>
                            </div>
                        )
                    })
                }                 
            </div>
                            
        </>
    );
}



function Products() {
    return (
        <>
          <CartProvider
                  onItemAdd={item => console.log(`Item ${item.id} adicionado!`)}
                  onItemUpdate={item => console.log(`Item ${item.id} atualizado!`)}
                  onItemRemove={() => console.log(`Item removido!`)}
          >
            <HeaderProducts />                         
            <Page />            
            <Footer /> 
          </CartProvider>
        </>
    );
  }
  


export default Products;


