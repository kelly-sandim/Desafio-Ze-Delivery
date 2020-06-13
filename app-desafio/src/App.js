import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
  return (          
      <>
          {/* Header */}
          <div class="header">
              <a href="#" class="logo"><img class="imageLogo" src="./assets/white-logo.svg" alt="Logo Zé Delivery"/></a>
              <div class="header-right">
                  <a class="active" href="#home">Entar</a>                  
              </div>
          </div>
          {/* Input */}
          <div class="inputCity">
            <input type="text"/>
          </div>

          {/* Footer */}
      </>
  );
}

export default App;
