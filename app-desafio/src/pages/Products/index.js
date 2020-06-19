import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

    return (          
        <>       
            {/* Produtos */}
            <div className="productList">                
                {
                    products.map(product => {
                        const alreadyAdded = inCart(product.id);

                        return (
                            <div className="card" key={ product.id }>                                
                                <img src={ product.image } alt="Avatar" style={{width:"100%"}} />
                                <div className="container">
                                    <h4><b>{ product.name }</b></h4>
                                    <p>{ product.price }</p>
                                </div>
                                <button onClick={() => addItem(product)}>
                                    {alreadyAdded ? "Add again" : "Add to Cart"}
                                </button>
                            </div>
                        )
                    })
                }                 
            </div>
                            
        </>
    );
}

function Cart() {
    const {
      isEmpty,
      cartTotal,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
      emptyCart
    } = useCart();
  
    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
      <>
        <h1>
          Cart ({totalUniqueItems} - {cartTotal})
        </h1>
  
        {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}
  
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.quantity} x {item.name}
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeItem(item.id)}>Remove &times;</button>
            </li>
          ))}
        </ul>
      </>
    );
  }


function Products() {
    return (
        <>
            <HeaderProducts /> 
            <CartProvider
                onItemAdd={item => console.log(`Item ${item.id} added!`)}
                onItemUpdate={item => console.log(`Item ${item.id} updated.!`)}
                onItemRemove={() => console.log(`Item removed!`)}
            >
                <Cart />
                <Page />
            </CartProvider>
            <Footer /> 
        </>
    );
  }
  


export default Products;


