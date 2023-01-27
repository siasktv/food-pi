import React, { useState, useEffect } from "react"
import { MobileIcon, Nav, NavBarContainer, NavLinks, NavLogo, NavMenu, NavItem, NavBtn, NavBtnLink} from "./HeaderElements"
import {FaBars} from "react-icons/fa"
import { animateScroll as scroll } from "react-scroll"


const Header = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    if(window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(()=> {
    window.addEventListener("scroll", changeNav)
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  return (
    <>
    <Nav scrollNav={scrollNav}>
      <NavBarContainer>
        <NavLogo to="/" onClick={toggleHome}>Henry Food</NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars/>
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to="about" smooth={true} duration={500} spy={true}
            excat="true" offset={-80}
            >About</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="benefits" smooth={true} duration={500} spy={true}
            excat="true" offset={-80}>Benefits</NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/create">Create</NavBtnLink>
        </NavBtn>
      </NavBarContainer>
    </Nav>
    </>
  )
}
export default Header;