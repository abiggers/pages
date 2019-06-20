import React,{ Component } from 'react'
import './navbar.css'
import App from '../../App'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";





class Navbar extends Component {




    render (){
        return (
            <div>
                <div id={'barbuffer'}></div>
<div id="navbar">
    <ul id='navbuttons'>
      <li><Link to='/contact'>Contact</Link></li>
      <li><Link to='/code'>Code</Link></li>
      <li><Link to='/'>Home</Link></li>
    
    </ul>
    </div></div>
        )
    }
}

export default Navbar