import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, NEXT_PAGE, PREV_PAGE, ORDER,
    FILTER_BY_ACTIVITY,FILTER_BY_CONTINENT, RESET_PAGE, RESET_FILTER} from './action-types'
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

export const nextPage = (location) => {
    return {
        type: NEXT_PAGE,
        payload:location
    }
}

export const prevPage = (location) => {
    return {
        type: PREV_PAGE,
        payload: location
    }
}

export const resetPage = (location) => {
    return {
        type: RESET_PAGE,
        payload:location
    }
}

export const orderCountry = (location, order) => {
    return {
        type: ORDER,
        payload: order,
        location:location
    }
}

export const filterContinentCountry = (location,continent) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent,
        location:location
    }
}

export const filterActivityCountry = (location,activity) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity,
        location:location
    }
}
export const resetFilter = (location)=>{
    return {
        type: RESET_FILTER,
        payload: location
    }
}