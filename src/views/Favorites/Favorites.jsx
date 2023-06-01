import { CardsContainer, OrderAndFilter, Paginated } from "../../Components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from './Favorites.module.css'

const Favorites = () => {
        const {favorites, currentFavPage} = useSelector(state => state)

        const [viewCountries, setViewCountries] = useState(favorites)

        let firstCountry = (currentFavPage-1) * 10;
        let lastCountry = currentFavPage * 10;
    

        useEffect(()=>{
            setViewCountries(favorites?.slice(firstCountry,lastCountry))
        },[favorites, currentFavPage, firstCountry, lastCountry])


        return (
                <div className={style.Favorites}>
                    <OrderAndFilter />
                    <CardsContainer viewCountries={viewCountries}/>
                    {(viewCountries?.length === 0)? <div className={style.container}>no favorites to show</div> : null}
                    {(viewCountries?.length < 6 && viewCountries?.length !== 0)? <div className={style.container2}></div> : null}
                    {viewCountries?.length !== 0 && <Paginated/>}

        
                </div>
        )
    }

export default Favorites;