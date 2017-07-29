import React, {Component} from 'react';
import Nav from './components/Nav'
import Home from './components/Home';
import About from './components/About';
import Content from './components/Content';
import NotFound from './components/NotFound';
import Recipe from './components/Recipe'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

const Main = () => (
  <div className="main-body">
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/recipe/:recipeId" component={Recipe}/>
      <Route path="/about" component={About}/>
      <Route path="/content" component={Content}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Main />
      </div>
    );
  }
}

const Routes = (props) => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Routes;
