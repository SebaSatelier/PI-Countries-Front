import { useState } from 'react'
import {formValidation} from '../../Utils/Validation'
import {getAllCountries} from '../../Redux/countryActions'
import {getActivities} from '../../Redux/activityActions'
import { recFav } from '../../Redux/userActions'
import {URL} from '../../Utils/Utils'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const FormCreateActivity = ({style}) => {

    const dispatch = useDispatch()

    const {allCountries, userData} = useSelector(state => state);

    const [selectedCountry, setSelectedCountry] = useState('');

    const [response, setResponse] = useState('')

    const [activityData, setActivityData] = useState({
        name : '',
        image: '',
        dificulty : '',
        duration: '',
        season: '',
        country: []

     });

     const [errors, setErrors] = useState({
        name : '',
        image: '',
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
                return setResponse(data.message)
                
        } catch (error) {
            return setResponse(error.response.data.error)
        }finally{
            setActivityData({...activityData,
                name : '',
                image: '',
                dificulty : '',
                duration: '',
                season: '',
                country: []
        
            })
            
        }

    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        await postActivity(activityData)
        dispatch(getAllCountries())
        dispatch(recFav(userData.id))
        dispatch(getActivities())
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
        }
     }

     const handleDeleteCountry = (event) => {
        setActivityData({...activityData,
        country: activityData.country.filter(country => country !== event.target.value)})
        console.log(activityData.country);
     }

     const handleMessage = () => {
        setResponse("")
      }

     let availableCountries = allCountries.filter(country => !activityData.country.includes(country?.name))

    return(
            <form onSubmit={handleSubmit} >
                <div className={style.formDiv}>
                    <div >
                        <label htmlFor="name">Name: </label>
                        <input disabled={response && true} type="text" value={activityData.name} placeholder='Activity name' onChange={handleChange} name='name'/>
                        
                    </div>
                    {errors.name && <p>{errors.name}</p>}

                    <div >
                        <label htmlFor="name">Image (URL): </label>
                        <input disabled={response && true} type="text" value={activityData.image} placeholder='Activity image' onChange={handleChange} name='image'/>
                        
                    </div>
                    {errors.image && <p>{errors.image}</p>}

                    <div >
                        <label htmlFor="dificulty">Dificulty<br/>(1 - 5): </label>
                        <input disabled={response && true} type="number" min='1' max='5' step='1' value={activityData.dificulty} placeholder='Dificulty' onChange={handleChange} name='dificulty'/>
                    </div>
                    {errors.dificulty && <p>{errors.dificulty}</p>}

                    <div >
                        <label htmlFor="duration">Duration<br/>(hours): </label>
                        <input disabled={response && true} type="number" min='0' step='0.5' value={activityData.duration} placeholder='Duration' onChange={handleChange} name='duration'/>
                    </div>
                    {errors.duration && <p>{errors.duration}</p>}

                    <div>
                        <label htmlFor="season">Season:</label>
                        <select disabled={response && true} id="season" name="season" value={activityData.season} onChange={handleChange} >
                            <option disabled value="">Select an option</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>
                    {errors.season && <p>{errors.season}</p>}

                    <div id={style.countryContainer}>
                        <label style={{backgroundColor:"whitesmoke"}} htmlFor="country">Country:</label>
                        <select disabled={response && true} name="country"  onChange={handleChange} value={selectedCountry}>
                            <option disabled value="">Select an option</option>
                            {availableCountries.map(country =>{
                                return <option key={country.id} value={country.name}>{country.name}</option>
                            })}
                            
                        </select>
                        <button disabled={response && true} id={style.addCountryButton} type="button" onClick={handleAddCountry}>Add Country</button>
                    {activityData.country.length<1 && <p>Select 1-5 countries</p>}
                    </div>
                </div>
                
                <div className={style.countryList}>
                    {!response && <ul>
                        {activityData.country.map(country => {
                            return <li key={country} id={style.selectedCountry}>{country} 
                                        <button type="button" id={style.deleteButton} value={country} onClick={handleDeleteCountry}>X</button>
                                    </li>
                        })}
                    </ul>}
                    {response && <div id={style.response}>
                            <h2>{response}</h2> 
                            <button style={{height: "20px"}} onClick={handleMessage}>OK</button>
                        </div>}
                </div>
                    <button disabled={buttonDisable(activityData,errors)} type='submit'>Submit</button>
            </form>
    )
}

export default FormCreateActivity;