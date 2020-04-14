import React from 'react'; 
import logo from '../logo.svg';
import {Nav, Navbar} from 'react-bootstrap'


const NavBar = () => {
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/"> <img style = {{'height' : 'auto', 'width' :'50px',}} src = {logo} alt = "another" />  </Navbar.Brand>
            <Nav activekey = "/home" className="justify" variant = "pills">
                <Nav.Item> <img src = {logo} alt = "another" /> </Nav.Item>
                <Nav.Item> <Nav.Link eventKey="home" href="/">Home</Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link eventKey="ProblemFilter" href="/problem-filter"> Problem Filter</Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link eventKey="Recommendation" href="/">Recommendation</Nav.Link> </Nav.Item>
            </Nav>
      </Navbar>
    )
}

export default NavBar; 