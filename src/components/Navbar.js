import React from 'react'; 
import {NavLink} from 'react-router-dom'; 

const Navbar = () => {
    return (
        <nav className = "nav-bar">
            <div className = "container">
                <ul>  
                    <li> <NavLink to = '/'> Home </NavLink> </li>
                    <li> <NavLink to = '/problem-filter'> Problem Filter </NavLink> </li> 
                </ul>  
            </div> 
        </nav>  
    )
}

export default Navbar; 