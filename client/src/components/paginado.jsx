import React from "react";
import './paginado.css'

export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];

    for(let i = 0; i <= Math.ceil((allRecipes/recipesPerPage)-1); i++){
        pageNumbers.push(i+1)
    }
    return(
        <div className="center">
            <div className="pagination">
                {pageNumbers?.map(number => (
                    <button 
                    key={number} 
                    className='a'
                    onClick={() => paginado(number)}>{number}</button>
                ))}
            </div>
        </div>
    )
}