import axios from "axios";
import { useState,useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {URL} from '../../Utils/Utils'

const Details = () => {
const {id} = useParams()

const [country, setCountry] = useState({})

const detail = async () => {
    const {data} = await axios(`${URL}/countries/${id}`)
    if(data.name){
        setCountry(data)
        }
}

useEffect(()=>{
    detail()
    return setCountry({})
},[id])    

return (
        <div>
            <p>{country.id}</p>
            <p>{country.name}</p>
            <img src={country.flag}/>
            <p>{country.continent}</p>
            <p>{country.capital}</p>
            <p>{country.subregion}</p>
            <p>{country.area}</p>
            <p>{country.population}</p>
        </div>
    )
}

export default Details;