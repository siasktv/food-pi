import React, {useState} from "react";
import { Link } from 'react-router-dom';
import HeroSection from "./heroSection/HeroSection";
import NavBar2 from "./NavBar2"
import InfoSection from "./infoSection/InfoSection";
import { homeObjOne } from "./infoSection/Data";
import Services from "./services/Services";
import Footer from "./footer/Footer";

export default function LandingPage () {
    return(
        <>
        <NavBar2/>
        <HeroSection/>
        <InfoSection {...homeObjOne}/>
        <Services/>
        <Footer/>
        </>
    )
}