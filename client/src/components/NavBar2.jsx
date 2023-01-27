import React, {useState} from "react";
import Header from "./header/Header1";
import SideBar from "./sideBar/SideBar";

export default function LandingPage () {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return(
        <>
        <Header toggle={toggle}/>
        <SideBar isOpen={isOpen} toggle={toggle}/>
        </>
    )
}