import React, { Component } from "react";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import { findDOMNode } from "react-dom";
import ZeSmallLogo from '../assets/small-logo.svg';
import { CartProvider, useCart } from "react-use-cart";

function Cart() {
  
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  if (isEmpty) return <p>Seu Carrinho está vazio :(</p>;

  return (
    <>
      <h1>
        Carrinho ({totalItems} - R$ { (Math.round(cartTotal * 100) / 100).toFixed(2)})
      </h1>

      {!isEmpty && <button className="cartButton" onClick={emptyCart}>Esvaziar Carrinho</button>}

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.quantity} x {item.name}
            <button
              className="cartButton"
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <button
              className="cartButton"
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button 
              className="cartButton"
              onClick={() => removeItem(item.id)}>Remover &times;
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}


class HeaderProducts extends Component {

    render() {      
      return (
        
          <header className="header">
              <div className="container">
                  <a href="#" className="logo"><img className="imageLogoSmall" src={ ZeSmallLogo } alt="Logo Zé Delivery"/></a>                
                  <Cart />
              </div>
          </header>
        
            
      );
    }
  }
  
export default HeaderProducts;
