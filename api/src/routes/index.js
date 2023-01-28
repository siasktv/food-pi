const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
require('dotenv').config();
const { YOUR_API_KEY, API_KEY1, API_Key2, API_Key3 } = process.env;
const { Recipe, Diet } = require("../db.js")
const router = Router();

//FUNCIONES
//------------------Para traer la info de la api y db

const getRecipesApi = async ()=> {
    try {
    const recipesApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ YOUR_API_KEY }&number=100&addRecipeInformation=true`)

    const recipesApi2 = recipesApi.data.results?.map((element)=>{ 
        return {
            id: element.id,
            name: element.title,
            summary: element.summary,
            healthScore: element.healthScore,
            steps : element.analyzedInstructions[0]?.steps.map((e)=> e.step), 
            image: element.image,
            diets: element.diets?.map((element) => ({name:element})),
        }
    });
  
        return recipesApi2; 
    } catch (error) {
        console.log(error) 
    }
};

const getRecipesDb = async () => {
    try {
        const recipesDb = await Recipe.findAll({          
            include: {                           
                model: Diet,            
                attributes: ['name'],             
                through: {
                    attributes: []
                } 
            }
        });
        return recipesDb; 
    } catch (error) {
        console.log(error);  
    }
};

const getAllRecipes = async () => {
    const api_recipes = await getRecipesApi(); 
    const db_recipes = await getRecipesDb(); 
    const allrecipes = [...api_recipes, ...db_recipes]; 
    return allrecipes; 
};



//---------------------------Para traer las diets y cargarlas en la base de datos 
const getAllDiets = async function (){
    try {
    const allRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${ YOUR_API_KEY }&addRecipeInformation=true&number=100`);
      const dietsArrays = allRecipes.data.results?.map((recipe) => recipe.diets);
    
      const dietsEach = dietsArrays.flat();

      const diets = [...new Set(dietsEach)];
    
      diets.forEach(async (diet) => {
           await Diet.findOrCreate({
                where: {
                     name: diet
                }
           })
      })
      return diets;
    } catch (error) {
        console.log(error)
    }
 };

//------------------------Para agregar una nueva receta
const addNewRecipe = async (name, summary, healthScore, steps, image, diets) => {
    try{
        const searchDiets = await Diet.findAll({
            where: {
                name: diets
            }
        });

        if(searchDiets.length === diets.length){
            const newRecipe = await Recipe.create({
                name,
                summary,
                healthScore,
                steps,
                image,
                });
                await newRecipe.addDiet(searchDiets);
                return newRecipe;
        }

} catch(error){
    console.log(error);
}};

//----------------------------Para obtener una receta por Id

const getRecipeById = async (id) => {
    try{
        if(id.includes('-')) {
            const recipe = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    atributes: ["name"],
                    through: {
                        attributes: [],
                    }
                }
            })
            return recipe;
        } else {
            const recipeByIdAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${ YOUR_API_KEY }`);
            const recipeByIdAPI2 = recipeByIdAPI.data 

            const idAPI = {
                id: recipeByIdAPI2.id,
                name: recipeByIdAPI2.title,
                summary: recipeByIdAPI2.summary,
                healthScore: recipeByIdAPI2.healthScore,
                steps : recipeByIdAPI2.analyzedInstructions[0]?.steps.map((e)=> e.step), 
                image: recipeByIdAPI2.image,
                diets: recipeByIdAPI2.diets.map((element) => ({name:element})),
              }
              return idAPI;
        }
    } catch(error){
        console.log(error)
    }
};

router.get('/recipes', async (req, res) => {
   try{
    const { name } = req.query;
    const allRecipes = await getAllRecipes();

    if(name){
        const recipesByName = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        if(recipesByName.length){ 
            res.status(200).send(recipesByName);
        } else {
            res.status(404).send({message : 'No recipes found'});
        }
    } else {
        res.status(200).send(allRecipes);
    }
 } catch(error) {
    res.status(400).send({error : error.message});
 }
});


router.get('/diets', async (req, res) => {
    try{
        const allDiets = await getAllDiets() 

        if(allDiets){
            res.status(200).send(allDiets);
        } else {
            res.status(404).send({message : 'No diets found'});
        }
    } catch (error) {
        res.status(400).send({error : error.message});
    }
});



router.post('/recipes', async (req, res) => {
    try{
        const { name, summary, healthScore, steps, diets, image } = req.body;

        if(!name || !summary || !Array.isArray(diets) || diets.length === 0 ){
            res.status(400).send({error : 'Name, summary and diets are required'});
        }
        const newRecipe = await addNewRecipe(name, summary, healthScore, steps, image, diets);

        res.status(200).send(newRecipe);
    } catch(error) {
        res.status(400).send({error: error.message})
    }
});


router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const recipeId = await getRecipeById(id)
            if(recipeId){  
                res.status(200).send(recipeId); 
            } else {
                res.status(404).send({message : 'No recipe found'}); 
            } 
    } catch (error) {
        res.status(400).send({error : error.message});
    }
  })



  //delete, update --------sequalize methods, axios methods 
  //detalle------? db editar --------- form crear receta = update 

module.exports = router;