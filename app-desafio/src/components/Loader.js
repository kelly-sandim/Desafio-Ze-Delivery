import React, { Component } from "react";

const Loader = props => {
    function exitPopUp(){
        document.getElementById("popup").style.display = "none";
    }

    return(        
        <div id="loader" className="loaderCenter"></div>  
    );
};

export default Loader;