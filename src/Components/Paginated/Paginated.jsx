import { useSelector, useDispatch } from 'react-redux';
import { nextPage,prevPage } from '../../Redux/countryActions'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Paginated.module.css'

const Paginated = () => {

const location = useLocation()
    
const {currentHomePage , countries, currentFavPage, favorites} = useSelector(state =>state)
    
const dispatch = useDispatch();

const [currentPage, setCurrentPage] = useState(currentHomePage)

const [currentCountries, setCurrentCountries] = useState(countries)

const handlePage = (event) =>{

    if(event.target.name !== "nextPage") return dispatch(prevPage(location.pathname))
    return dispatch(nextPage(location.pathname))
}

const handleDisablePrevButton = (currentPage) => {
    if(currentPage < 2) return true;
    return false 
}

const handleDisableNextButton = (currentPage, currentCountries) => {
    const pageQuantity = (currentCountries?.length / 10);
    if(currentPage >= pageQuantity) return true;
    return false 
}

useEffect(()=>{
    if(location.pathname === "/favorites"){
    setCurrentPage(currentFavPage)
    setCurrentCountries(favorites)
    }
    if(location.pathname === "/home"){
        setCurrentPage(currentHomePage)
        setCurrentCountries(countries)
        }
},[location, currentFavPage,currentHomePage,favorites,countries])
    
return (
        <div className={style.container}>
            <button onClick={handlePage} name="prevPage" disabled = {handleDisablePrevButton(currentPage)}>Prev</button>


            <span>{currentPage}</span>



            <button onClick={handlePage} name="nextPage" disabled= {handleDisableNextButton(currentPage, currentCountries)}>Next</button>
        </div>
    )    
}

export default Paginated;