import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProblemFilter from './components/ProblemFilter'; 
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Testing from './components/Testing'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga'; 

ReactGA.initialize('163942936'); 
ReactGA.pageview(window.location.pathname + window.location.search);

// console.log(window.location.pathname + window.location.search);
function App() {
  console.log(process.env.PUBLIC_URL, 'heeloo')
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route exact path = '/' component = {ProblemFilter} /> 
          {/* <Route exact path = '/problem-filter' component = {ProblemFilter} /> 
          <Route exact path = '/testing' component = {Testing} />  */}
          <Redirect to = '/' /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
