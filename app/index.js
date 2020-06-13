import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
    render(){
        return(
            //Needs to have a header, a footer and a input for the user to fill up with the address.
            <>
                {/* Header */}
                <div class="header">
                    <a href="#default" class="logo">CompanyLogo</a>
                    <div class="header-right">
                        <a class="active" href="#home">Home</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>
                    </div>
                </div>
                {/* Input */}

                {/* Footer */}
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))