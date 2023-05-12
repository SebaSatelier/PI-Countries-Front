import { useState } from 'react'
import {loginValidation} from '../../Utils/Validation'

const Login = ({login}) => {

    const [userData, setUserData] = useState({
        email : '',
        password : ''
     })

     const [errors, setErrors] = useState({
        email : '',
        password : ''
     })

     const handleChange = (event) => {
        setUserData({...userData,
        [event.target.name]: event.target.value})
        setErrors(
            loginValidation({...userData,
                [event.target.name]: event.target.value
            })
        )
     }

     const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
     }

     const buttonDisable = (userData,errors) => {
        let disable = false;
        if(!userData.email || !userData.password) disable = true;
        if(errors.email || errors.password) disable = true;
        return disable
     } 

    return(

            <form onSubmit={handleSubmit} >
                <div >
                    <label htmlFor="email">Email: </label>
                    <input  type="email" value={userData.email} placeholder='Ingrese su email' onChange={handleChange} name='email'/>
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" value={userData.password} placeholder='Ingrese su password' onChange={handleChange} name='password'/>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <button disabled={buttonDisable(userData,errors)}>Sing in</button>
            </form>

    )
}

export default Login;