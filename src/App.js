import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import NotFound from './components/NotFound'
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Navbar />
        <Switch>
          <Route exact path = '/' component = {Home} /> 
          <Route path = '*' component = {NotFound} /> 
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
