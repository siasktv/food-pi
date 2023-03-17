import axios from 'axios'
import url from '../api'
//

console.log(url)

export function getAllRecipes() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'https://food-pi-production-a75b.up.railway.app/recipes',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      console.log(response)
      return dispatch({
        type: 'GET_ALL_RECIPES',
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterRecipesByDiet(payload) {
  return {
    type: 'FILTER_RECIPES_BY_DIET',
    payload,
  }
}

export function orderByScore(payload) {
  return {
    type: 'ORDER_BY_SCORE',
    payload,
  }
}

export function orderbyScore50(payload) {
  return {
    type: 'ORDER_BY_50',
    payload,
  }
}

export function orderByAlphabet(payload) {
  return {
    type: 'ORDER_BY_ALPHABET',
    payload,
  }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload,
  }
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${url}/recipes?name=` + name)
      return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: json.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const info = await axios.get(`${url}/diets`)
      return dispatch({
        type: 'GET_DIETS',
        payload: info.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      const response = axios.post(`${url}/recipes`, payload)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`${url}/recipes/` + id)
      return dispatch({
        type: 'GET_DETAILS',
        payload: result.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
