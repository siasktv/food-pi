// import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllRecipes, filterRecipesByDiet, orderByScore, getDiets, orderByAlphabet, filterCreated, orderbyScore50 } from "../redux/actions";
// import { Link } from "react-router-dom";
// import Card from "./card";
// import Paginado from "./paginado";
// import './home.css'
// import SearchBar from "./searchBar";
// import NavBar2 from "./NavBar2";
// import Footer from "./footer/Footer";



// export default function Home () {
//     const dispatch = useDispatch();
    
//     const allRecipes = useSelector((state) => state.recipes);

//     const diets = useSelector((state) => state.diets);

//     const [orden, setOrden] = useState('')
//     const [currentPage, setCurrentPage] = useState(1);
//     const [recipesPerPage, setRecipesPerPage] = useState(9);
//     const indexOfLastRecipe = currentPage * recipesPerPage;
//     const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
//     const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

//     const paginado = (pageNumber) => {
//          setCurrentPage(pageNumber);
//     }

//     useEffect(() => {
//         dispatch(getAllRecipes());
//         dispatch(getDiets());
//     }, [dispatch])

//     function handleClick (e) {
//         e.preventDefault();
//         dispatch(getAllRecipes());
//     }
   
//     function handleFilterDiet(e) {
//         dispatch(filterRecipesByDiet(e.target.value))
//     }
//     function handleByScore(e){
//         e.preventDefault();
//         dispatch(orderByScore(e.target.value))
//         setCurrentPage(1);
//         setOrden(`Ordenado ${e.target.value}`)
//     }

//     const [orderaz,setOrderaz] = useState('');

//     function handleByAlphabet (e) {
//         e.preventDefault();
//         dispatch(orderByAlphabet(e.target.value))
//         setCurrentPage(1);
//         setOrderaz(e.target.value)
//     }
//     function handleFilterCreated (e) {
//         e.preventDefault();
//         setCurrentPage(1);
//         dispatch(filterCreated(e.target.value))
       
//     }
//     // function handleFilter50 (e) {
//     //     e.preventDefault();
//     //     dispatch(orderbyScore50())
//     //     setCurrentPage(1);
//     // }


//     return (
//         <>
//         <div className="home-container"> 
//             <div className="home-page">
//             <div className="home-page-buttons">
//             {/* <div>
//             <Link style= { {textDecoration: 'none'}} to ='/recipe'>
//                 <button id='bottone5'>Create Recipe</button>
//             </Link>
//             </div> */}
//             <div>
//                 <select className="select-btn" onChange={e => handleByScore(e)}>
//                     <option value='up'>Up</option>
//                     <option value='down'>Down</option>
//                 </select>
//                 <select className="select-btn" onChange={e => handleByAlphabet(e)}>
//                     <option value='A-Z'>A-Z</option>
//                     <option value= 'Z-A'>Z-A</option>
//                 </select>
//                 <select className="select-btn" onChange={e => handleFilterCreated (e)}>
//                     <option value='all'>All</option>
//                     <option value='created'>Created</option>
//                     <option value='api'>Api</option>
//                 </select>
//                 <select className="select-btn" onChange={e => handleFilterDiet(e)}>
//                     <option value='all'>All</option>
//                     <option value='gluten free'> Gluten free </option>
//                     <option value='dairy free'> Dairy free </option>
//                     <option value='lacto ovo vegetarian'> Lacto ovo vegetarian </option>
//                     <option value='vegan'> Vegan </option>
//                     <option value='paleolithic'> Paleolithic </option>
//                     <option value='primal'> Primal </option>
//                     <option value='whole 30'> Whole 30 </option>
//                     <option value='pescatarian'> Pescatarian </option>
//                     <option value='ketogenic'> Ketogenic </option>
//                     <option value='fodmap friendly'> Fodmap friendly </option>
                            
//                 </select>
//                 </div>

//             {/* <button onClick={e => {handleClick(e)}}>
//                 All Recipes
//             </button> */}
//             <SearchBar/>
//             </div>
//                 <div className="wrapper"> 
//                 {  
//                     currentRecipes?.map(el => {
//                         return(
//                                  <Card
//                                  image={el.image}
//                                  name={el.name}
//                                  diets={el.diets}
//                                  healthScore={el.healthScore}
//                                  id={el.id}
//                                  />
//                         )
//                     })
//                 }
//                 </div>
              
               
           
//         </div>
//         <div className="paginado">
//         <Paginado
//                 recipesPerPage={recipesPerPage}
//                 allRecipes={allRecipes.length}
//                 paginado={paginado}
//                 />
//         </div>
//         </div>
//         <Footer/>
//     </>
//     )
// }
                        