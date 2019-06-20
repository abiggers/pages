import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './pages/home/home'
import Contact from './pages/contact/contact'
import Code from './pages/code/code'
import D3ManipulatorForce3D from './pages/D3ManipulatorForce3D/D3ManipulatorForce3D';
import BarChartPage from './pages/BarChart/BarChart';

class App extends Component {
  render() {
window.localStorage.setItem('biggersProfileUniqueId', 'sample')
    return (
      <div className="App">
          <Router>
      <div>
      <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/code" component={Code} />
        <Route exact path='/d3manipulator' component={D3ManipulatorForce3D} />
        <Route exact path='/barchart' component={BarChartPage} />
      </div>
    </Router>

</div>





    );
  }
}

export default App;
