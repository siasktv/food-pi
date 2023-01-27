import React from "react";
import {FaFacebook, FaInstagram, FaGithub, FaLinkedin} from "react-icons/fa"
import {animateScroll as scroll} from "react-scroll"
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksContainer, 
    FooterLinksWrapper, 
    FooterLinkItems, 
    FooterLinkTitle, 
    FooterLink, 
    SocialMedia, 
    SocialMediaWrap, 
    SocialLogo, 
    WebsiteRights, 
    SocialIcons, 
    SocialIconLink } from "./FooterElements";

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop()
      }
    return(
       <FooterContainer>
        <FooterWrap>
        <FooterLinksContainer>
            <FooterLinksWrapper>
                {/* <FooterLinkItems>
                <FooterLinkTitle>About Us</FooterLinkTitle>
                    <FooterLink to="/">How it works</FooterLink>
                    <FooterLink to="/">Testimonials</FooterLink>
                    <FooterLink to="/">Careers</FooterLink>
                    <FooterLink to="/">Investors</FooterLink>
                    <FooterLink to="/">Terms of Service</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                <FooterLinkTitle>Contact Us</FooterLinkTitle>
                    <FooterLink to="/">Contact</FooterLink>
                    <FooterLink to="/">Support</FooterLink>
                    <FooterLink to="/">Destinations</FooterLink>
                    <FooterLink to="/">Sponsorships</FooterLink>
                    </FooterLinkItems> */}
            </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
            <SocialMediaWrap>
                <SocialLogo to="/" onClick={toggleHome}>
                    HenryFood
                </SocialLogo>
                <WebsiteRights>HenryFood © {new Date().getFullYear()}
                All rights reserved.
                </WebsiteRights>
                <SocialIcons>
                    <SocialIconLink href="//www.github.com/siasktv" target="_blank"
                    aria-label="Github">
                        <FaGithub />
                    </SocialIconLink>
                    <SocialIconLink href="//www.linkedin.com/in/bianca-bm/" target="_blank"
                    aria-label="Linkedin">
                        <FaLinkedin />
                    </SocialIconLink>
                </SocialIcons>
            </SocialMediaWrap>
        </SocialMedia>
        </FooterWrap>
       </FooterContainer>
    )
}

export default Footer;