
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
}
function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_ALL_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'FILTER_RECIPES_BY_DIET':
            const allRecipes = state.allRecipes;
            const filterDiet = action.payload === 'all' ? allRecipes : allRecipes.filter((recipe)=> recipe.diets.find((e)=> e.name === action.payload))
            return {
                ...state,
                recipes: filterDiet,
            }
        case 'ORDER_BY_SCORE':
                let sortedArray = action.payload === 'up' ? state.recipes.sort((a,b) => b.healthScore - a.healthScore ) : state.recipes.sort((a,b) => a.healthScore - b.healthScore );
                return {
                    ...state,
                    recipes: sortedArray,
                }
        case 'ORDER_BY_ALPHABET':
            let allRecipes2 = state.allRecipes;
            let orderAz = action.payload === "A-Z"? allRecipes2.sort(function(a,b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1; 
                if (b.name.toLowerCase() > a.name.toLowerCase()) return-1;
                return 0;
            }): allRecipes2.sort(function(a,b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1; 
                if (b.name.toLowerCase() > a.name.toLowerCase()) return  1;
                return 0;
            });
                return{
                    ...state,
                    recipes: orderAz
                }
         case 'FILTER_CREATED':
            const allCreated = state.allRecipes;
            const createdFilter = action.payload === 'created' ? allCreated.filter( el => typeof el.id === 'string' ) : allCreated.filter( el => typeof el.id === 'number');
                return{
                    ...state,
                    recipes: action.payload === 'all' ? state.allRecipes : createdFilter
            }
        case 'GET_NAME_RECIPES': 
                return{
                    ...state,
                    recipes: action.payload
                }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state,
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: [action.payload]
            }
        case 'ORDER_BY_50':
            let healthScore = state.allRecipes;
            let healthScore50 = healthScore.filter(e => e.healthScore < 50)
            return {
                ...state,
                recipes: healthScore50
            }
       
            default:
                return state;
    }

};

export default rootReducer;