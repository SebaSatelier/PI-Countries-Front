import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountryByName } from "../../Redux/countryActions";
import {useLocation} from 'react-router-dom';
import style from './SearchBar.module.css'


const SearchBar = () => {
    // ESTADO LOCAL PARA MANEJAR EL INPUT DE LA SEARCHBAR 
    let [name,setName] = useState("");

    const dispatch = useDispatch()

    // SE USA LA LOCACION PARA DESHABILITAR EL BOTON SEARCH, DEPENDIENDO LA RUTA EN LA QUE ESTAMOS
    const location = useLocation()

    //FUNCION PARA MANEJAR EL CAMBIO EN EL INPUT Y ENVIARLO 
    const handleChange = (event) =>{
        setName(event.target.value)
        onSearch(name)
    }
    //FUNCION ONSEARCH, PARA ENVIAR EL DISPATCH DE LA ACTION CUANDO SE BUSCA UN PAIS
    const onSearch = (name) => {
        dispatch(getCountryByName(name))
        
  
  }
    return (
        <div className={style}>
         <input type='search' onChange = {handleChange}  value={name} placeholder="Search a country"/>
         <button onClick={() => {onSearch(name); setName('')}} disabled={(location.pathname !== '/about' && location.pathname !== '/favorites') ? false:true}>SEARCH</button>
      </div>
    )
}

export default SearchBar;
