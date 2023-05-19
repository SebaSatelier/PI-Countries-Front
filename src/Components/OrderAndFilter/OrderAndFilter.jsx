import {orderCountry, filterContinentCountry, filterActivityCountry, resetPage, getAllCountries} from '../../Redux/countryActions'
import { useDispatch, useSelector } from 'react-redux';
import style from './OrderAndFilter.module.css'

const OrderAndFilter = ()=>{
    const dispatch = useDispatch()

    const handleOrder = (event) => {
        dispatch(orderCountry(event.target.value))
    };


    const handleContinentFilter = (event) =>{
        dispatch(filterContinentCountry(event.target.value))
        dispatch(resetPage())
    };


    const handleActivityFilter = (event) => {
        dispatch(filterActivityCountry(event.target.value))
        dispatch(resetPage())
    };

    const {allCountries} = useSelector(state=> state)

    let allActivities = allCountries.map(country => country.activities).flat().map(activity => activity?.name)
   
    let activities = allActivities.filter((value, index) => allActivities.indexOf(value) === index);

return(
        <div className={style.OrderFilter}>   
                <div>
                    <p>Order: </p>
                    <select onChange={handleOrder}>
                        <option value="A">A - Z</option>
                        <option value="Z">Z - A</option>
                        <option value="MIN">Population: Min - High</option>
                        <option value="HIGH">Population: High - Min</option>
                    </select>
                </div>



                <div>
                    <p>Continent: </p>
                    <select onChange={handleContinentFilter}>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Antarctic">Antartic</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Ocenia</option>
                        <option value="All">All countries</option>
                    </select>
                </div>

                <div>
                    <p>Activity: </p>
                    <select onChange={handleActivityFilter}>
                        <option value="All">All</option>
                        {activities.map(activity => {
                            return <option key={activity} value={activity}>{activity}</option>
                            })}
                    </select>
                    <button type="button" onClick={() => dispatch(getAllCountries())}>Reset Filter</button>
                </div>
        </div>
    )
}


export default OrderAndFilter;