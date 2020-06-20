import React, { Component } from "react";

const Modal = props => {
    function exitPopUp(){
        document.getElementById("popup").style.display = "none";
    }

    return(        
        <div class="container">
            <div id="popup" class="popup__wrapper">
                <div class="popup__container">
                    <button className="exit" onClick={ exitPopUp }>X</button>
                    <h1 className="popup__title">Oooops!</h1>
                    <p>A localização que digitou não foi encontrada :(
                    </p>
                </div>
            </div>
        </div>    
    );
};

export default Modal;