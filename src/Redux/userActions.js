import { USER_DATA, GET_FAVORITES, ADD_FAV, REMOVE_FAV, LOG_OUT} from "./action-types";
import axios from "axios"
import {URL} from'../Utils/Utils'

export const getUserData = (user) =>{
    return {
        type: USER_DATA,
        payload: user
    }
}

export const recFav = (id) => {
    return async (dispatch)=> {
       try{
          const {data} = await axios(`${URL}/fav?id=${id}`);
          return dispatch({
             type: GET_FAVORITES,
             payload : data
          })
       }catch(error) {
          return error.message
       }
    }
 }
 
 
 //Action para agregar un personaje a favoritos.
 export const addFav = (idData) => {
    return async (dispatch) => {
       try{
       const {data} = await axios.post(`${URL}/fav`, idData)
       return dispatch({
             type: ADD_FAV,
             payload: data,
          });
       }catch(error){ 
          return error.message
       }
    };
 };
 
 // Action para borrar un personaje de favoritos
 export const removeFav = (idData) => {
    return async (dispatch) => {
       try{
          const {data} = await axios.delete(`${URL}/fav`,{data:idData});
          return dispatch({
                type: REMOVE_FAV,
                payload: data,
             });
          
       }catch(error) {
          return error.message;
       }
    };
 };

 export const log_Out = () =>{
   return {
       type: LOG_OUT,
   }
}