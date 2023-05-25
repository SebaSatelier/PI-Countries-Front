import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountryByName, resetPage } from "../../Redux/countryActions";
import {useLocation} from 'react-router-dom';
import style from './SearchBar.module.css'


const SearchBar = ({style}) => {
    // ESTADO LOCAL PARA MANEJAR EL INPUT DE LA SEARCHBAR 
    let [name,setName] = useState("");

    const dispatch = useDispatch()

    // SE USA LA LOCACION PARA DESHABILITAR EL BOTON SEARCH, DEPENDIENDO LA RUTA EN LA QUE ESTAMOS
    const location = useLocation()

    //FUNCION PARA MANEJAR EL CAMBIO EN EL INPUT Y ENVIARLO 
    const handleChange = (event) =>{
        setName(event.target.value)
        // onSearch(name)
    }
    //FUNCION ONSEARCH, PARA ENVIAR EL DISPATCH DE LA ACTION CUANDO SE BUSCA UN PAIS
    const onSearch = (name) => {
        dispatch(getCountryByName(name))
        dispatch(resetPage(location))
        
  
  }
    return (
        <div className={style}>
         <input type='search' onChange = {handleChange}  value={name} placeholder="Search a country" disabled={(location.pathname === "/home") ? false:true}/>
         <button className={style.navBarButton} onClick={() => {onSearch(name); setName('')}} disabled={(location.pathname === "/home") ? false:true}>SEARCH</button>
         <button className={style.navBarButton} onClick={() => {onSearch(""); setName('')}} disabled={(location.pathname === "/home") ? false:true}>RESET</button>
      </div>
    )
}

export default SearchBar;
