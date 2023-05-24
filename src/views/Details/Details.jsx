import axios from "axios";
import { useState,useEffect } from 'react';
import { useParams, NavLink, useLocation} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getActivities } from "../../Redux/activityActions";
import {URL} from '../../Utils/Utils'
import style from './Details.module.css'


const Details = () => {
const {id} = useParams()

const [country, setCountry] = useState({})

const dispatch = useDispatch()


const [selectedActivity, setSelectedActivity] = useState('');

const [activityData, setActivityData] = useState([])

const [response, setResponse] = useState("")


const detail = async () => {
    const {data} = await axios(`${URL}/countries/${id}`)
    if(data.name){
        setCountry(data)
        }
}

const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value)
}

const deleteActivity = async (activityId, countryId)=>{
    try{
        const {data} = await axios.delete(`${URL}/activities`, {data: {activityId, countryId}})
        dispatch(getActivities())
        detail()
        return setResponse(data.activity);
    } catch (error) {
      return setResponse(error.response.data.error);
    } finally {
        setSelectedActivity("")
    }
}

useEffect(()=>{
    detail()
    return setCountry({})
},[id])

useEffect(()=>{
    setActivityData(country?.activities?.find(activity => activity.id === Number(selectedActivity)))
},[selectedActivity])



return (
        <div className={style.container}>
                <NavLink to="/home"><button>BACK</button></NavLink>
            <div>
                <div id={style.detailContainer}>
                    <br/>
                    <h1>{country.name}</h1>
                    <br/>
                    <img src={country?.flag?.[0]} alt={country.name}/>
                    <br />
                        <div id={style.countryDetails}>
                            <h3><span style={{margin: '0 35px'}} >ID:</span><span style={{margin: '0 78px'}} >{country.id}</span></h3>
                            <h3><span style={{margin: '0 35px'}} >Continent:</span><span style={{margin: '0 19px'}} >{country.continent}</span></h3>
                            <h3><span style={{margin: '0 35px'}} >Subregion:</span>{(country.subregion)?<span style={{margin: '0 17px'}} >{country.subregion}</span> : <span style={{margin: '0 17px'}}><em>N/A</em></span>}</h3>
                            <h3><span style={{margin: '0 35px'}} >Capital:</span><span style={{margin: '0 39px'}} >{country.capital}</span></h3>
                            <h3><span style={{margin: '0 35px'}} >Area:</span><span style={{margin: '0 59px'}} >{country.area}</span></h3>
                            <h3><span style={{margin: '0 35px'}} >Population:</span><span style={{margin: '0 10px'}} >{country.population}</span></h3>
                        </div>
                </div>
            </div>
            <div id={style.activitiesDetails}>
                <h2>ACTIVIDADES</h2>
                <select name="activity" id="" value={selectedActivity} onChange={handleActivityChange}>
                    <option disabled value="">Select an option</option>
                    {country?.activities?.map(activity => {
                        return <option key={activity.id} value={activity.id}>{activity.name}</option>
                    })}
                </select>
                <div id={style.activitiesDetailsContainer}>
                    {activityData && <div id={style.activityData} >
                                <h3>Activity name: {activityData?.name}</h3>
                                <h3>Dificulty level: {activityData?.dificulty}</h3>
                                <h3>Duration time: {activityData?.duration} hours</h3>
                                <h3>Season to practice: {activityData?.season}</h3>
                                <button onClick={()=> deleteActivity(activityData.id,country.id)}>Delete</button>
                            </div>   
                    }
                </div>
            </div>
        </div>
    )
}

export default Details;