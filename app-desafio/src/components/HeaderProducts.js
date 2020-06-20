import React, { Component } from "react";
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

  function addDefaultSrc(ev) {
    ev.target.src = 'http://www.esquadriasesal.com.br/wp-content/uploads/2019/07/imagem-nao-disponivel-esal-esquadrias.jpg';
  }

  function displayList() {
    var list = document.getElementById("cartList");
    if (window.getComputedStyle(list).display === "none") {
      document.getElementById("cartList").style.display = "block";
    }
    else {
      document.getElementById("cartList").style.display = "none";
    }
  }

  if (isEmpty) return( 
    <>
      <p className="header-right header-text"><FontAwesomeIcon className="cartIcon" icon={faShoppingCart} onClick={ displayList } /> - Seu Carrinho está vazio :(</p>
      <div className="header-right cart-content"></div>
    </>
    );

  return (    
    <>
      <p className="header-right header-text">
      <FontAwesomeIcon className="cartIcon" icon={faShoppingCart} onClick={ displayList } /> - {totalItems}  (Sub-total: R$ { (Math.round(cartTotal * 100) / 100).toFixed(2)})
      </p>
      <div id="cartList" className="header-right cart-content">

        {!isEmpty && <button className="cartRemoveButton" onClick={emptyCart}>Esvaziar Carrinho</button>}

        <ul className="ulCartItem">
          {items.map(item => (
            <li key={item.id } className="liCartItem">
              <img className="imageItemCart" onError={e => addDefaultSrc(e)} src={ item.image } alt=""/>
              <p className="cartItem">{item.quantity} x {item.name}</p>
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
                className="cartRemoveButton"
                onClick={() => removeItem(item.id)}>Remover &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}


class HeaderProducts extends Component {

    render() {      
      return (
        
          <header className="header">              
              <div className="header-left">
                <a href="#" className="logo"><img className="imageLogoSmall" src={ ZeSmallLogo } alt="Logo Zé Delivery"/></a>                
                <p className="address-one">Receber agora em</p>              
                <p className="address-two">{ localStorage.getItem('placeAddress') }</p>
              </div>
              <Cart />
          </header>
        
            
      );
    }
  }
  
export default HeaderProducts;
