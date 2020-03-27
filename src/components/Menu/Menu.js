import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" >
        
        Home
      </a>
      <a href="/About" >
        About
        </a>
      <a href="/SignUp" >
        Sign Up
        </a>
         <a href="/SignIn" >
        Sign In
        </a>
         <a href="/Joinatryout" >
        Join A Tryout
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;