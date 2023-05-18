import {POST_ACTIVITY, GET_ACTIVITIES, DELETE_ACTIVITY, UPDATE_ACTIVITY} from './action-types'
import axios from "axios"
import {URL} from '../Utils/Utils'

//ACTION PARA CREAR UNA NUEVA ACTIVIDAD Y CARGARLA EN EL ESTADO GLOBAL
// export const postActivity = (activity) => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axios.post(`${URL}/activities`, activity)
//             return dispatch({
//                 type: POST_ACTIVITY,
//                 payload: data
//             })
//         } catch (error) {
//             return error.message;
//         }
//     }
// }
//ACTION PARA CARGAR TODAS LAS ACTIVIDADES AL ESTADO GLOBAL
export const getActivities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL}/activities`)
            return dispatch({
                type: GET_ACTIVITIES,
                payload: data
            })
        } catch (error) {
            return error.message;
        }
    }
}
//ACTION PARA BORRAR UNA ACTIVIDAD DE LA BASE DE DATOS
export const deleteActivity = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`${URL}/activities/${id}`)
            return dispatch({
                type: DELETE_ACTIVITY,
                payload: data
            })
        } catch (error) {
            return error.message;
        }
    }
}

export const updateActivity = (id,activity) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`${URL}/activities/${id}`, activity)
            return dispatch({
                type: UPDATE_ACTIVITY,
                payload: data
            })
        } catch (error) {
            return error.message;
        }
    }
}