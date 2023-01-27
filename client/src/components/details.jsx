import React, { useEffect }from "react";
import { getDetail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './details.css';
import Footer from "./footer/Footer";
import { FiArrowLeft } from "react-icons/fi";
    
export default function Details () {
    const dispatch = useDispatch();

    const {id} = useParams();

    const myRecipe = useSelector(state => state.detail)
    console.log(myRecipe)

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id])

  
    return(
        <>
        <Link style= { {textDecoration: 'none'}} to = '/home'>
        <FiArrowLeft 
        color={"green"} 
        padding-right= "100px"
        margin-top="100px"
        font-size= "30px"
        />
        </Link>
         <div className="contenedor">

{
    myRecipe.length > 0 ?
    <div className="recipedetail">
        <div className="big-img">
        <img src={myRecipe[0].image} alt="" />
        </div>
        <div className="box">
        <h1 className="nombre-recipe">{myRecipe[0].name}</h1>
        <p className="summary">{myRecipe[0].summary?.replace(/<[^>]*>?/g,'')}</p>
        <p>{myRecipe[0].stock}</p>
        <div className="steps">
        <h3>Steps: </h3>
        {
            typeof myRecipe[0].steps !== "string" ? myRecipe[0].steps?.map((el) => el + ('  ')) :
            myRecipe[0].steps
        }
        </div>
        <div className="diets">
        <h3>Diets: </h3>
        {  
        
        myRecipe[0].diets?.map(d => d.name + (','))
        
        }
        </div>
        </div>

    </div> : <p>Loading..</p>
}
</div>
<Footer/>
    </> 
    )
}