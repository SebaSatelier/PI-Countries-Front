import { CardsContainer, OrderAndFilter, Paginated } from "../../Components";
import { useDispatch } from 'react-redux';
import { getAllCountries } from '../../Redux/countryActions';
import { useEffect } from "react";
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch();
  
    useEffect(()=>{
        dispatch(getAllCountries())
    },[])
    return (
        <div>
            <OrderAndFilter />
            <CardsContainer/>
            <Paginated/>

        </div>
    )
}

export default Home;