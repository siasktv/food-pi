import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../redux/actions";
import './SearchBar.css'
import Logo from '../images/search.png'

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }



    function handleSubmit (e) {
        e.preventDefault()
        dispatch(getNameRecipes(name));  
    }

    return(
        <div className="input-group">
            <input
            className="input"
            text = 'text'
            placeholder = 'Search recipe..'
            onChange= {(e) => handleInputChange(e)}
            />
            <button
             type='submit' 
             onClick={(e) => handleSubmit(e)}><img src={Logo} alt='img'/></button>
        </div>
    )
}