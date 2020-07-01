import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
    if (localStorage.getItem('userID')){
        return (
            <StyledMenu open={open} aria-hidden={!isHidden} {...props}>

                <a href="/" >
                    Home
                </a>
                {localStorage.getItem("currentTryoutID") ?
                <a href="/TryoutDashboard">
                    {localStorage.getItem("currentTryoutName")} Homepage
                </a>
                :
                <> </>}
                <a href="/CreateATryout">
                    New Tryout
                </a>
                <a href="/SignOut">
                    Sign Out
                </a>

            </StyledMenu>
        )
    }
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
      <a href="/Findatryout" >
        Find A Tryout
      </a>

    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;