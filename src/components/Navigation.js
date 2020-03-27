import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
         // <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/SignIn">Signin</NavLink>
          <NavLink to="/SignUp">Signup</NavLink>
          <NavLink to="/JoinATryout">Joinatryout</NavLink>
       </div>
    );
}
 
export default Navigation;