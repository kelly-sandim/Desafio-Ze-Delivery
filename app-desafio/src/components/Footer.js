import React, { Component } from "react";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = props => {
    return (        
        <div className="footerDiv">
            <div className="content">
                <div className="footer-grids">
                    <div className="footer one">
                        <h3>Mais sobre a Drink Delivery</h3>
                        <p> O Drink Delivery é uma ótima alternativa para a compra de bebidas, 
                        com mais de 1.000.000 de pedidos entregues! É só pedir pelo aplicativo,
                        que levamos rapidinho até você. O melhor de tudo: pelo mesmo preço do mercado 
                        (ou até mais barato) e a bebida ainda chega geladíssima!</p>
                        
                        <div className="clear"></div>
                    </div>
                    <div className="footer two">
                        <h3>Nossos Canais</h3>
                        <ul>
                            <li><a className="fb" href="#"><FontAwesomeIcon className="icon" icon={ faFacebook } />Curta nosso Face</a></li>
                            <li><a className="fb1" href="#"><FontAwesomeIcon className="icon" icon={ faInstagram } />Siga-nos no Twitter</a></li>
                            <li><a className="fb2" href="#"><FontAwesomeIcon className="icon" icon={ faTwitter } />Siga-nos no Instagram</a></li>                            
                        </ul>
                    </div>
                    <div className="footer three">
                        <h3>Contatos</h3>
                        <ul>
                            <li>Drink Delivery <span>São Paulo - SP</span>Brasil</li>
                            <li>1234567890 </li>
                            <li><a href="mailto:info@example.com">contato@drinkdelivery.com</a> </li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="copy-right-grids">
                    <div className="copy-left">
                            <p className="footer-gd">BEBA COM MODERAÇÃO</p>
                    </div>
                    <div className="copy-right">
                        <ul>                            
                            <li><a href="#">Política de Privacidade</a></li>
                            <li><a href="#">Termos de uso</a></li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>  
        </div>
    );
};

export default Footer;
