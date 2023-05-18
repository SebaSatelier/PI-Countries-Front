import axios from "axios";
import { useState,useEffect } from 'react';
import { useParams, NavLink} from 'react-router-dom';
import {URL} from '../../Utils/Utils'
import style from './Details.module.css'

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
        <div className={style.container}>
            <div>
                <NavLink to="/home"><button>BACK</button></NavLink>
                <div id={style.detailContainer}>
                    <br/>
                    <h1>{country.name}</h1>
                    <br/>
                    <img src={country.flag} alt={country.name}/>
                    <br />
                    <div id={style.countryDetails}>
                        <div>
                            <h3>Continent:</h3>
                            <h3>Subregion:</h3>
                            <h3>Capital:</h3>
                            <h3>Area:</h3>
                            <h3>Population:</h3>
                        </div>
                        <div>
                            <h3>{country.continent}</h3>
                            <h3>{country.subregion}</h3>
                            <h3>{country.capital}</h3>
                            <h3>{country.area}</h3>
                            <h3>{country.population}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;