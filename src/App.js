import {Route, Routes, useLocation,useNavigate} from 'react-router-dom';
import './App.css';
import {Landing, Home, Details, ActivitiesForm, Favorites,} from './views';
import { NavBar } from './Components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {URL} from './Utils/Utils';
import { useDispatch } from 'react-redux';
import {getAllCountries } from './Redux/countryActions';
import {getUserData, recFav, log_Out} from './Redux/userActions'
import {getActivities} from './Redux/activityActions'

function App() {
  const dispatch = useDispatch()

  const location = useLocation()

  const navigate = useNavigate();

  const [access,setAccess] = useState(false)

  const [response, setResponse] = useState('')

    const login = async (userData) => {
        try{
          const {data} = await axios.post(`${URL}/user/login`, userData);
          const access = data.access
          setAccess(access);
          dispatch(getAllCountries())
          dispatch(getUserData(data.userData))
          access && navigate('/home')
          dispatch(recFav(data.userData.id))
          dispatch(getActivities())
        }catch(error){
          setResponse(error.response.data.error)
        }
  }

    const logOut = () => {
      dispatch(log_Out())
      setAccess(false)
  }

    useEffect(() => {
      !access && navigate('/')
  }, [access,navigate]);

  return (
    <div>

        {location.pathname !== '/' && <NavBar logOut={logOut} />}

        <Routes>

          <Route exact path="/" element={<Landing login={login} response={response} setResponse= {setResponse}/>}/>

          <Route path="/favorites" element={<Favorites />}/>

          <Route path="/activities" element={<ActivitiesForm/>}/> 

          <Route path='/detail/:id' element= {<Details/>}/>

          <Route path="/home" element={<Home/>}/>

        </Routes>
    </div>
  );
}

export default App;
