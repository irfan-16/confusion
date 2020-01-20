import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from "./components/MainComponent";
import './App.css';
import {Provider} from 'react-redux'; //to make Redux Store available to all component
import {ConfigureStore} from './redux/configureStore';


const store = ConfigureStore();

class App extends Component {

  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div> 
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
