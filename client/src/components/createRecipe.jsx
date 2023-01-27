import React, { useState, useEffect }from "react";
import {useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './createRecipe.css'


function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = 'Recipe name required';
    } else if(!input.summary){
        errors.summary = 'Summary is required'
    }
    
    if(input.healthScore < 1 || input.healthScore > 100){
        errors.healthScore = 'HealthScore should have a value between 1 and 100'
    } else if(input.steps.length < 10){
        errors.steps = 'Steps should have at least 10 letters'; 
    }

    if(input.diets.length < 1){
        errors.diets = 'Select at least one type'
    }
    return errors;
  };

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allDiets = useSelector((state) => state.diets)
    // console.log(allDiets);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);
    
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: '',
        steps:'',
        image:'',
        diets: []
    });

    function handleChange (e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleSelect (e) {
       if(e.target.name === 'diets') {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        });
       
    }
}
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Recipe Created!')
        setInput({
            name: '',
            summary: '',
            healthScore: '',
            steps:'',
            image:'',
            stock: 0,
            diet: []
        })
        history.push('/home')
    }
    function handleDelete (el){
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
    }


    return(
        <div className="createRecipe">

        <div className="container">

        <h1 className="title">Create your recipe!</h1>
        <form className= "form" action='#' onSubmit={e => handleSubmit(e)}>
            <div className="inputfield"> 
                <label>Recipe Name</label>
                <input 
                type="text" 
                value={input.name} 
                name="name" 
                onChange={(e) => handleChange(e)}
                />
                { errors.name && (
                    <p>{errors.name}</p>
                )}
            </div>
            <div className="inputfield">
                <label>Recipe Summary </label>
                <textarea 
                className="box"
                name="summary" 
                cols="50" 
                rows="3" 
                value={input.summary} 
                onChange={(e) => handleChange(e)} 
                />
                {
                    errors.summary && (
                        <p>{errors.summary}</p>
                    )
                }
            </div>

            <div className="inputfield">
                <label>Steps </label>
                <textarea 
                className="box"
                name='steps' 
                cols="50" 
                rows="2" 
                value={input.steps} 
                onChange={(e) => handleChange(e)} 
                />
                 {
                    errors.steps && (
                        <p>{errors.steps}</p>
                    )
                }
            </div>
            <div className="inputfield">
                <label>Image Link</label>
                <input
                type="url" 
                value={input.image} 
                name="image" 
                onChange={(e) => handleChange(e)}/>
            </div>
            <div className="inputfield">
            <label>HealthScore: </label>
            <span>{input.healthScore}</span>
                  <input
                    type="range"
                    name="healthScore"
                    min="1"
                    max="100"
                    value={input.healthScore}
                    onChange={(e) => handleChange(e)}
                    />
            </div> 
           <div className="inputfield">
            <label >Diet Types: </label>
            <div className="custom_select">
            <select 
            name='diets' 
            onChange={(e) =>  handleSelect(e)}
            >
            {

                allDiets.map(d => 
            
                        <option onChange={e => handleChange(e)} key={d} value={d}>{d}</option>
                )
            }
            </select>
            </div>
     </div>

     {
            input.diets.map(el => 
                <div>
                    <p>{el}</p>
                    <button className="delete-button" onClick={() => handleDelete(el)}>x</button>
                </div>
                )
        }

            <button className="button-create-recipe"  type='submit'>Create Recipe</button>
        </form>

        </div>
       
      
        </div>
    )
}