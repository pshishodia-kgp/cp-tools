import React from 'react'; 
// import {NavLink} from 'react-router-dom'; 
import Logo from '../static/media/logo.svg';
import {Nav, Navbar} from 'react-bootstrap'


const NavBar = () => {
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/"><img src = {Logo} alt = "CP-Tools"/>   </Navbar.Brand>
            <Nav activekey = "/home" className="justify" variant = "pills">
                <Nav.Item> <Nav.Link eventKey="home" href="/">Home</Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link eventKey="ProblemFilter" href="/"> Problem Filter</Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link eventKey="Recommendation" href="/">Recommendation</Nav.Link> </Nav.Item>
            </Nav>
      </Navbar>
    )
}

export default NavBar; 