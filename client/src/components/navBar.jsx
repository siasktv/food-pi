import React from "react";
// import SearchBar from "./searchBar";
import { Link } from 'react-router-dom';
import './navBar.css';
import Logo from '../images/logoHenry.png'

export default function NavBar () {

    return(
    <div className="navBar">
        <div className="img-title">
        <Link to='/home'>
        <img id="logoFood" src={Logo} alt="Logo Food App"/>
        </Link>
        </div>
        {/* <SearchBar /> */}
    </div>
    )
   
}