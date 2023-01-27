import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, filterRecipesByDiet, orderByScore, getDiets, orderByAlphabet, filterCreated, orderbyScore50 } from "../../redux/actions/index"
import Card from '../card'
import Footer from '../footer/Footer';
import {  Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton } from './PageElements'
import SearchBar from '../searchBar';
import "./Pagination.css";
import Paginado from "../paginado.jsx";
import "./buttons.css"


const Page = () => {
    const dispatch = useDispatch();
    
    const allRecipes = useSelector((state) => state.recipes);

    const diets = useSelector((state) => state.diets);

    const [orden, setOrden] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginado = (pageNumber) => {
         setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getDiets());
    }, [dispatch]);


    function handleFilterDiet(e) {
        dispatch(filterRecipesByDiet(e.target.value))
    }
    function handleByScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    const [orderaz,setOrderaz] = useState('');

    function handleByAlphabet (e) {
        e.preventDefault();
        dispatch(orderByAlphabet(e.target.value))
        setCurrentPage(1);
        setOrderaz(e.target.value)
    }
    function handleFilterCreated (e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterCreated(e.target.value))
       
    }

  return (
    <>
       <Container>
            <FormWrap>
            <Icon to="/">HenryFood</Icon>
            <div className="home-page-buttons">
            <div>
                <select className="select-btn" onChange={e => handleByScore(e)}>
                    <option value='up'>Up</option>
                    <option value='down'>Down</option>
                </select>
                <select className="select-btn" onChange={e => handleByAlphabet(e)}>
                    <option value='A-Z'>A-Z</option>
                    <option value= 'Z-A'>Z-A</option>
                </select>
                <select className="select-btn" onChange={e => handleFilterCreated (e)}>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                    <option value='api'>Api</option>
                </select>
                <select className="select-btn" onChange={e => handleFilterDiet(e)}>
                    <option value='all'>All</option>
                    <option value='gluten free'> Gluten free </option>
                    <option value='dairy free'> Dairy free </option>
                    <option value='lacto ovo vegetarian'> Lacto ovo vegetarian </option>
                    <option value='vegan'> Vegan </option>
                    <option value='paleolithic'> Paleolithic </option>
                    <option value='primal'> Primal </option>
                    <option value='whole 30'> Whole 30 </option>
                    <option value='pescatarian'> Pescatarian </option>
                    <option value='ketogenic'> Ketogenic </option>
                    <option value='fodmap friendly'> Fodmap friendly </option>       
                </select>
                </div>
            <SearchBar/>
            </div>

            <FormContent>
        
            {  
                    currentRecipes?.map(el => {
                        return(
                                 <Card
                                 key={el.id}
                                 image={el.image}
                                 name={el.name}
                                 diets={el.diets}
                                 healthScore={el.healthScore}
                                 id={el.id}
                                 />
                        )
                    })
                }
                   </FormContent>
               
         
        </FormWrap>
        {/* {
                    allRecipes?.length > 0 && (
                    <div className="pagination">
                        <span  onClick={() => selectedPageHandler(page - 1) } 
                        className={page > 1 ? "" : "pagination__disable"}>◀️</span>
                        {[...Array(allRecipes?.length / 10)].map((_, i) => {
                       return (
                       <span 
                       key={i} 
                       className={page === i + 1 ? "pagination__selected" : ""}
                       onClick={() => selectedPageHandler(i + 1)}>
                       {i + 1}
                       </span>
                       )})}
                        <span  onClick={() => selectedPageHandler(page + 1)}
                        className={page < allRecipes.length / 10 ? "" : "pagination__disable"}
                        >▶️</span>
                    </div>
                )} */}
        <Paginado
         recipesPerPage={recipesPerPage}
         allRecipes={allRecipes.length}
         paginado={paginado}
        />
       </Container>
       <Footer/>
    </>
)
}

export default Page