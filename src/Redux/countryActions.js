import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, NEXT_PAGE, PREV_PAGE, ORDER,
    FILTER_BY_ACTIVITY,FILTER_BY_CONTINENT, CLEAN_COUNTRIES, RESET_PAGE} from './action-types'
import axios from "axios"
import {URL} from '../Utils/Utils'


//ACTION PARA BUSCAR BUSCAR TODOS LOS PAISES DE LA BASE DE DATOS Y LUEGO RENDERIZARLOS.
export const getAllCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL}/countries`)
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: data
            })
        } catch (error) {
            return error.message;
        }
    }
}
//ACTION PARA BUSCAR BUSCAR PAISES POR NOMBRE Y RENDERIZARLOS
export const getCountryByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL}/countries/name/?name=${name}`)
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: data
            })
        } catch (error) {
            return error.message;
        }
    }
}

export const cleanCountries = () =>{
    return {
        type: CLEAN_COUNTRIES,
    }
}

export const nextPage = () => {
    return {
        type: NEXT_PAGE
    }
}

export const prevPage = () => {
    return {
        type: PREV_PAGE
    }
}

export const resetPage = () => {
    return {
        type: RESET_PAGE
    }
}

export const orderCountry = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const filterContinentCountry = (continent) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent
    }
}

export const filterActivityCountry = (activity) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity
    }
}