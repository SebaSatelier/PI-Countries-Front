import { useState } from 'react';
import axios from 'axios'
import {loginValidation} from '../../Utils/Validation';
import {URL} from '../../Utils/Utils';
import style from './Register.module.css'



const Register = ({setOpenRegister, login}) => {

    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email : '',
        password : ''
     })

     const [response, setResponse] = useState('')

     const [created, setCreated] = useState(false)

     const [userData, setUserData] = useState({
        email: '',
        password: ''
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
          setResponse(data.user)
          setUserData(newUser)
          setCreated(true)
        }catch(error){
          setResponse(error.response.data.error)
        }finally{
          setNewUser({...newUser, email: "", password: ""})
        }
      }

    const buttonDisable = (newUser,errors) => {
        let disable = false;
        if(!newUser.email || !newUser.password) disable = true;
        if(errors.email || errors.password) disable = true;
        return disable
    }

    const handleMessage = () => {
      setResponse("")
      created && login(userData)
    }
  

    return (
          <div className={style.container}>

            {!response && <form onSubmit={handleSubmit} className={style.form}>
            <h2>REGISTER</h2>
            <div>
              <label htmlFor="email">Email</label>
            </div>

            <div>
              <input type="email" name="email" value={newUser.email} placeholder='Enter your email' onChange={handleChange}/>
              {errors.email && <p>{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <div>
              <em>(6 - 30 characters and 1 number)</em>
            </div>

            <div>
              <input type="password" name="password" value={newUser.password} placeholder='Enter your password' onChange={handleChange}/>
              {errors.password && <p>{errors.password}</p>}
            </div>
              
              <button type="submit" disabled={buttonDisable(newUser,errors)}>Sing up</button>
              <button type="button" onClick={() => setOpenRegister(false)} >Close</button>
            </form>}
              {response && <div className={style.response}>
                            <h2>{response}</h2> 
                            <button onClick={handleMessage}>OK</button>
                          </div>}
          </div>
    )
}

export default Register;