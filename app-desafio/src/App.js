import React from 'react';
import ZeLogo from './assets/white-logo.svg';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
  return (          
      <>
          {/* Header */}
          <div className="header">
              <a href="#" class="logo"><img className="imageLogo" src={ ZeLogo } alt="Logo Zé Delivery"/></a>
              <div className="header-right">
                  <a className="active" href="#">Entar</a>                  
              </div>
          </div>

          {/* Input */}
          <div className="inputCity">
            <input type="text"/>
          </div>

          {/* Footer */}
          <div className="footer">

          </div>
      </>
  );
}

export default App;
