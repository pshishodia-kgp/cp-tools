import React from 'react'; 
import {NavLink} from 'react-router-dom'; 
import {logo} from '../logo.svg'
import {Navbar, Nav} from 'react-bootstrap'; 


const NavBar = () => {
    return (  
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home"> <img src = {logo} className = "cp-tools-logo" /> </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default NavBar; 