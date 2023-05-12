import { useSelector, useDispatch } from 'react-redux';
import { nextPage,prevPage } from '../../Redux/countryActions'

const Paginated = () => {
    
const {currentPage , countries} = useSelector(state =>state)
    
const dispatch = useDispatch();

const handlePage = (event) =>{
    if(event.target.name !== "nextPage") return dispatch(prevPage())
    return dispatch(nextPage())
}

const handleDisablePrevButton = (currentPage) => {
    if(currentPage < 2) return true;
    return false 
}

const handleDisableNextButton = (currentPage) => {
    const pageQuantity = Math.floor(countries.length / 10);
    if(currentPage >= pageQuantity) return true;
    return false 
}
    
return (
        <div>
            <button onClick={handlePage} name="prevPage" disabled = {handleDisablePrevButton(currentPage)}>Prev</button>


            <span>{currentPage}</span>



            <button onClick={handlePage} name="nextPage" disabled= {handleDisableNextButton(currentPage)}>Next</button>
        </div>
    )    
}

export default Paginated;