import {orderCountry, filterContinentCountry, filterActivityCountry, resetPage,
     resetFilter} from '../../Redux/countryActions'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import style from './OrderAndFilter.module.css'

const OrderAndFilter = ()=>{
    const dispatch = useDispatch()

    const location = useLocation()

    const handleOrder = (location, event) => {
        dispatch(orderCountry(location.pathname, event.target.value))
    };


    const handleContinentFilter = (location, event) =>{
        dispatch(filterContinentCountry(location.pathname, event.target.value))
        dispatch(resetPage())
    };


    const handleActivityFilter = (location, event) => {
        dispatch(filterActivityCountry(location.pathname, event.target.value))
        dispatch(resetPage())
    };

    const {allActivities, activeActivityFilter, activeContinentFilter, activeFavActivityFilter, activeFavContFilter } = useSelector(state=> state)
   

return(
        <div className={style.OrderFilter}>   
                <div>
                    <p>Order: </p>
                    <select onChange={(event)=>handleOrder(location, event)}>
                        <option disabled value="">select</option>
                        <option value="A">A - Z</option>
                        <option value="Z">Z - A</option>
                        <option value="MIN">Population: Min - High</option>
                        <option value="HIGH">Population: High - Min</option>
                    </select>
                </div>



                <div>
                    <p>Continent: </p>
                    <select onChange={(event)=>handleContinentFilter(location, event)} value={(location.pathname === "/favorites")? activeFavContFilter : activeContinentFilter} >
                        <option value="All">All countries</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Antarctic">Antartic</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Ocenia</option>
                    </select>
                </div>

                <div>
                    <p>Activity: </p>
                    <select onChange={(event)=>handleActivityFilter(location, event)} value={(location.pathname === "/favorites")? activeFavActivityFilter :activeActivityFilter}>
                        <option value="All">All</option>
                        {allActivities?.map(activity => {
                            return <option key={activity.id} value={activity.name}>{activity.name}</option>
                            })}
                    </select>
                    <button type="button" onClick={() => dispatch(resetFilter(location.pathname))}>Reset Filter</button>
                </div>
        </div>
    )
}


export default OrderAndFilter;