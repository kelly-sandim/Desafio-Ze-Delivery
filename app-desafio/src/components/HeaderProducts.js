import React, { Component } from "react";
import EmptyCart from "../empty-states/EmptyCart";
import ZeSmallLogo from '../assets/small-logo.svg';
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


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

  if (isEmpty) return( 
    <div className="header-right cart-content">
      <p><FontAwesomeIcon className="cartIcon" icon={faShoppingCart} /> - Seu Carrinho está vazio :(</p>
    </div>
    );

  return (    
    <div className="header-right cart-content">
      <p>
      <FontAwesomeIcon className="cartIcon" icon={faShoppingCart} /> - {totalItems} - Total: R$ { (Math.round(cartTotal * 100) / 100).toFixed(2)}
      </p>

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
    </div>
  );
}


class HeaderProducts extends Component {

    render() {      
      return (
        
          <header className="header">              
              <a href="#" className="logo"><img className="imageLogoSmall" src={ ZeSmallLogo } alt="Logo Zé Delivery"/></a>                
              <Cart />
          </header>
        
            
      );
    }
  }
  
export default HeaderProducts;
