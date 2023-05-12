import { useState } from 'react';
import axios from 'axios'
import {loginValidation} from '../../Utils/Validation';
import {URL} from '../../Utils/Utils'



const Register = ({setOpenRegister}) => {
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email : '',
        password : ''
     })

     const handleChange = (event) => {
        setNewUser({...newUser,
        [event.target.name]: event.target.value})
        setErrors(
            loginValidation({...newUser,
                [event.target.name]: event.target.value
            })
        )
     }

     const handleSubmit = (event) => {
        event.preventDefault()
        singIn(newUser)
     }

    const singIn = async (newUser) => {
        try{
          const {data} = await axios.post(`${URL}/user/register`, newUser);
          setNewUser({...newUser, email: "", password: ""})
          alert(data)
        }catch(error){
          return error.message
        }
      }

    const buttonDisable = (newUser,errors) => {
        let disable = false;
        if(!newUser.email || !newUser.password) disable = true;
        if(errors.email || errors.password) disable = true;
        return disable
    }
  

    return (
        <div>
          <h2>Sing in</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={newUser.email} placeholder='Ingrese su email' onChange={handleChange}/>
            {errors.email && <p>{errors.email}</p>}

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={newUser.password} placeholder='Ingrese su password' onChange={handleChange}/>
            {errors.password && <p>{errors.password}</p>}
            
            <button type="submit" disabled={buttonDisable(newUser,errors)}>Sing up</button>
          </form>
          <button onClick={() => setOpenRegister(false)} >Close</button>
        </div>
    )
}

export default Register;