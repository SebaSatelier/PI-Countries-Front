import { useState } from 'react'
import {formValidation} from '../../Utils/Validation'
import { postActivity } from '../../Redux/activityActions'
import { useDispatch } from 'react-redux'

const Form = () => {
    const dispatch = useDispatch()

    const [activityData, setActivityData] = useState({
        name : '',
        dificulty : '',
        duration: '',
        season: '',
        country: ''

     })

     const [errors, setErrors] = useState({
        name : '',
        dificulty : '',
        duration: '',
        season: '',
        country: ''
     })

     const handleChange = (event) => {
        setActivityData({...activityData,
        [event.target.name]: event.target.value})
        setErrors(
            formValidation({...activityData,
                [event.target.name]: event.target.value
            })
        )
     }


     const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(postActivity(activityData))
      
     }

     const buttonDisable = (activityData,errors) => {
        let disable = false;
        if(!Object.values(activityData).every(value => value)) disable = true; 
        if(!Object.values(errors).every(value => !value )) disable = true;
        return disable
     }

    return(

            <form onSubmit={handleSubmit} >
                <div >
                    <label htmlFor="name">Name: </label>
                    <input  type="text" value={activityData.name} placeholder='Activity name' onChange={handleChange} name='name'/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div >
                    <label htmlFor="dificulty">Dificulty (1 - 5): </label>
                    <input  type="number" min='1' max='5' step='1' value={activityData.dificulty} placeholder='Dificulty' onChange={handleChange} name='dificulty'/>
                    {errors.dificulty && <p>{errors.dificulty}</p>}
                </div>

                <div >
                    <label htmlFor="duration">Duration (in hours): </label>
                    <input  type="number" min='0' step='0.5' value={activityData.duration} placeholder='Duration' onChange={handleChange} name='duration'/>
                    {errors.duration && <p>{errors.duration}</p>}
                </div>

                <div >
                    <label htmlFor="season">Season: </label>
                    <input  type="text" value={activityData.season} placeholder='Season' onChange={handleChange} name='season'/>
                    {errors.season && <p>{errors.season}</p>}
                </div>

                <div >
                    <label htmlFor="country">Country: </label>
                    <input type="text" value={activityData.country} placeholder='Country' onChange={handleChange} name='country'/>
                    {errors.country && <p>{errors.country}</p>}
                </div>

                <button disabled={buttonDisable(activityData,errors)}>Submit</button>
            </form>

    )
}

export default Form;