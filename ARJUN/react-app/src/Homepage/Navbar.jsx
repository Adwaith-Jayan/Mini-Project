import React from "react";
import { HeaderContainer, Logo, Nav, NavLink,Loginnav } from './StyledHeader';

function Navbar() {
    return (
      <HeaderContainer>
        <Logo>Stock System</Logo>
        <Nav>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <Loginnav className="Loginnav">Login</Loginnav>
        </Nav>
      </HeaderContainer>
    );
  }
  
  export default Navbar;