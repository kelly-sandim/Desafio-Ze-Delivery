import React, { Component } from "react";
import Counter from "./Counter";
import CartScrollBar from "./CartScrollBar";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import { findDOMNode } from "react-dom";
import ZeSmallLogo from '../assets/small-logo.svg';


class HeaderProducts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showCart: false,
        cart: this.props.cartItems
      };
    }
    handleCart(e) {
      e.preventDefault();
      this.setState({
        showCart: !this.state.showCart
      });
    }
    handleSubmit(e) {
      e.preventDefault();
    }    
    
    handleClickOutside(event) {
      const cartNode = findDOMNode(this.refs.cartPreview);
      const buttonNode = findDOMNode(this.refs.cartButton);
      if (cartNode.classList.contains("active")) {
        if (!cartNode || !cartNode.contains(event.target)) {
          this.setState({
            showCart: false
          });
          event.stopPropagation();
        }
      }
    }
    componentDidMount() {
      document.addEventListener(
        "click",
        this.handleClickOutside.bind(this),
        true
      );
    }
    componentWillUnmount() {
      document.removeEventListener(
        "click",
        this.handleClickOutside.bind(this),
        true
      );
    }
    render() {
      let cartItems;
      cartItems = this.state.cart.map(product => {
        return (
          <li className="cart-item" key={product.name}>
            <img className="product-image" src={product.image} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
            </div>
            <div className="product-total">
              <p className="quantity">
                {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
              </p>
              <p className="amount">{product.quantity * product.price}</p>
            </div>
            <a
              className="product-remove"
              href="#"
              onClick={this.props.removeProduct.bind(this, product.id)}
            >
              ×
            </a>
          </li>
        );
      });
      let view;
      if (cartItems.length <= 0) {
        view = <EmptyCart />;
      } else {
        view = (
          <CSSTransitionGroup
            transitionName="fadeIn"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            component="ul"
            className="cart-items"
          >
            {cartItems}
          </CSSTransitionGroup>
        );
      }
      return (
        <header className="header">
            <div className="container">
                <a href="#" className="logo"><img className="imageLogoSmall" src={ ZeSmallLogo } alt="Logo Zé Delivery"/></a>
                
                <div className="cart">
                    <div className="cart-info">
                        <table>
                        <tbody>
                            <tr>
                            <td>No. de items</td>
                            <td>:</td>
                            <td>
                                <strong>{this.props.totalItems}</strong>
                            </td>
                            </tr>
                            <tr>
                            <td>Sub Total</td>
                            <td>:</td>
                            <td>
                                <strong>{this.props.total}</strong>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <a
                        className="cart-icon"
                        href="#"
                        onClick={this.handleCart.bind(this)}
                        ref="cartButton"
                    >
                        <img
                        className={this.props.cartBounce ? "tada" : " "}
                        src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
                        alt="Cart"
                        />
                        {this.props.totalItems ? (
                        <span className="cart-count">{this.props.totalItems}</span>
                        ) : (
                        ""
                        )}
                    </a>
                    <div
                        className={
                        this.state.showCart ? "cart-preview active" : "cart-preview"
                        }
                        ref="cartPreview"
                    >
                        <CartScrollBar>{view}</CartScrollBar>
                        <div className="action-block">
                        <button
                            type="button"
                            className={this.state.cart.length > 0 ? " " : "disabled"}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                        </div>
                    </div>
                    </div>
            </div>
        </header>

            
      );
    }
  }
  
  export default HeaderProducts;
