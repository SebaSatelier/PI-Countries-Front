import { CardsContainer, OrderAndFilter, Paginated } from "../../Components";
import {useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from './Home.module.css'

const Home = () => {
    const {countries, currentHomePage} = useSelector(state => state)

    const [viewCountries, setViewCountries] = useState(countries)

    let firstCountry = (currentHomePage-1) * 10;
    let lastCountry = currentHomePage * 10;


    useEffect(()=>{
        setViewCountries(countries?.slice(firstCountry,lastCountry))
    },[countries, currentHomePage])
    return (
        <div className={style.Home}>
            <OrderAndFilter />
            <CardsContainer viewCountries={viewCountries}/>
            {(viewCountries?.length === 0)? <div className={style.container}>country not found</div> : null}
            {(viewCountries?.length < 6 && viewCountries?.length !== 0)? <div className={style.container2}></div> : null}
            {viewCountries?.length !== 0 && <Paginated/>}

        </div>
    )
}

export default Home;