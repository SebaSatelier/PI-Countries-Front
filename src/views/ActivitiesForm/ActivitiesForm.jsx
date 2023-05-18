import { useEffect, useState } from 'react'
import {formValidation} from '../../Utils/Validation'
import {URL} from '../../Utils/Utils'
import { useSelector } from 'react-redux'
import axios from 'axios'
import style from './ActivitiesForm.module.css'

const ActivitiesForm = () => {

    const {allCountries} = useSelector(state => state);

    const [selectedCountry, setSelectedCountry] = useState('');

    const [resetSelect, setResetSelect] = useState(false);

    const [activityData, setActivityData] = useState({
        name : '',
        dificulty : '',
        duration: '',
        season: '',
        country: []

     });

     const [errors, setErrors] = useState({
        name : '',
        dificulty : '',
        duration: '',
        season: '',
     });

     const handleChange = (event) => {
        if(event.target.name === "country"){
            setSelectedCountry(event.target.value)
        }else{
        setActivityData({...activityData,
        [event.target.name]: event.target.value})
        setErrors(
            formValidation({...activityData,
                [event.target.name]: event.target.value
            })
        )}
    }

    const postActivity = async (activity) => {
        try {
                const { data } = await axios.post(`${URL}/activities`, activity);
                return alert(data.message)
                
        } catch (error) {
            return error.message;
        }finally{
            setActivityData({...activityData,
                name : '',
                dificulty : '',
                duration: '',
                season: '',
                country: []
        
            })
            
        }

    }


    const handleSubmit = (event) => {
        event.preventDefault()
        postActivity(activityData)
     }

     const buttonDisable = (activityData,errors) => {
        let disable = false;
        if(activityData.country.length<1) disable = true; 
        if(!Object.values(activityData).every(value => value)) disable = true; 
        if(!Object.values(errors).every(value => !value )) disable = true;
        return disable
     }

     const handleAddCountry = () =>{
        if(activityData.country.length<5 && selectedCountry){
        setActivityData({...activityData,
            country: [...activityData.country, selectedCountry]})
        setSelectedCountry("")
        setResetSelect(true);
        console.log(activityData.country);
        }
     }

     const handleDeleteCountry = (event) => {
        setActivityData({...activityData,
        country: activityData.country.filter(country => country !== event.target.value)})
        console.log(activityData.country);
     }

     useEffect(() => {
        if (resetSelect) {
          setSelectedCountry("");
          setResetSelect(false);
        }
      }, [resetSelect]);

     let availableCountries = allCountries.filter(country => !activityData.country.includes(country?.name))

    return(
        <div className={style.container}>
            <form onSubmit={handleSubmit} >
                <div>
                    <h1>add activity</h1>
                    <div >
                        <label htmlFor="name">Name: </label>
                        <input  type="text" value={activityData.name} placeholder='Activity name' onChange={handleChange} name='name'/>
                        
                    </div>
                    {errors.name && <p>{errors.name}</p>}

                    <div >
                        <label htmlFor="dificulty">Dificulty (1 - 5): </label>
                        <input  type="number" min='1' max='5' step='1' value={activityData.dificulty} placeholder='Dificulty' onChange={handleChange} name='dificulty'/>
                    </div>
                    {errors.dificulty && <p>{errors.dificulty}</p>}

                    <div >
                        <label htmlFor="duration">Duration (in hours): </label>
                        <input  type="number" min='0' step='0.5' value={activityData.duration} placeholder='Duration' onChange={handleChange} name='duration'/>
                    </div>
                    {errors.duration && <p>{errors.duration}</p>}

                    <div>
                        <label htmlFor="season">Season:</label>
                        <select id="season" name="season" value={activityData.season} onChange={handleChange} >
                            <option disabled value="">Select an option</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>
                    {errors.season && <p>{errors.season}</p>}

                    <div id={style.countryContainer}>
                        <label htmlFor="country">Country:</label>
                        <select name="country"  onChange={handleChange} value={selectedCountry}>
                            <option disabled value="">Select an option</option>
                            {availableCountries.map(country =>{
                                return <option value={country.name}>{country.name}</option>
                            })}
                            
                        </select>
                        <button id={style.addCountryButton} type="button" onClick={handleAddCountry}>Add</button>
                    {activityData.country.length<1 && <p>Select almost 1 country</p>}
                    </div>
                </div>
                
                <div>
                    <ul>
                        {activityData.country.map(country => {
                            return <li id={style.selectedCountry}>{country} 
                                        <button type="button" id={style.deleteButton} value={country} onClick={handleDeleteCountry}>X</button>
                                    </li>
                        })}
                    </ul>
                </div>
                
                <div>
                    <button disabled={buttonDisable(activityData,errors)} type='submit'>Submit</button>
                </div>
            </form>
            
            <div></div>
        
        </div>

    )
}

export default ActivitiesForm;