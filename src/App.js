import {Route, Routes, useLocation,useNavigate} from 'react-router-dom';
import './App.css';
import {Landing, Home, Details, Form} from './views';
import { NavBar } from './Components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {URL} from './Utils/Utils';

function App() {

  const location = useLocation()

  const navigate = useNavigate();

  const [access,setAccess] = useState(false)

    const login = async (userData) => {
        try{
          const {data} = await axios.post(`${URL}/user/login`, userData);
          const access = data.access
          setAccess(access);
          access && navigate('/home')
           // recuperarFavoritos()
        }catch(error){
          return error.message
        }
  }

    const logOut = () => {
      setAccess(false)
  }

    useEffect(() => {
      !access && navigate('/')
  }, [access,navigate]);

  return (
    <div>

        {location.pathname !== '/' && <NavBar logOut={logOut} />}

        <Routes>

          <Route exact path="/" element={<Landing login={login}/>}/>

          <Route path="/favorites" />

          <Route path="/activities" element={<Form/>}/> 

          <Route path='/detail/:id' element= {<Details/>}/>

          <Route path="/home" element={<Home/>}/>

        </Routes>
    </div>
  );
}

export default App;
