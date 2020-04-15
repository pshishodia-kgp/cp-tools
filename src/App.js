import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProblemFilter from './components/ProblemFilter'; 
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <NavBar />
        <Switch>
          <Route exact path = '/cp-tools' component = {Home} /> 
          <Route exact path = '/cp-tools/problem-filter' component = {ProblemFilter} /> 
          <Route path = '/cp-tools/*' component = {NotFound} /> 
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
