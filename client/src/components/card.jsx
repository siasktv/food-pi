import React from "react";
import { Link } from "react-router-dom";
import './card.css'
//falta mostrar tipo de plato

export default function Card ({ id, image, name, diets, healthScore}) {
    return(
        <div className="card">
           
           <img className="image"
             src={image}
             alt="delicious food"
            />
            <div className="card__body">
            
             <h1 className="title">{name}</h1>
             <p>{healthScore}</p>
             <p>{diets?.map((diet) => diet.name).join(" , ")}</p>
            </div>
            <Link to={`/recipes/${id}`}>
            <button className="btn-card"> View Details</button>
            </Link>
        </div>
    )
}