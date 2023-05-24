import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { removeFav, addFav } from "../../Redux/userActions";
import style from './Card.module.css';

const Card = ({id,name,flag,continent}) => {

    const dispatch = useDispatch()

    const {userData,allFavorites} = useSelector(state => state)
   
   const [isFav,setIsFav] = useState(false)


   const handleAddFavorite =(id)=>{
    if(isFav){
        setIsFav(false)
        dispatch(removeFav({userId: userData.id, countryId: id}))
    }
    if(!isFav){
    setIsFav(true)
    dispatch(addFav({userId: userData.id, countryId: id}))
   }
}
   
   useEffect(() => {
      allFavorites?.map(fav => {
        if (fav.id === id) {
           return setIsFav(true);
         }
         return
      });
   }, [allFavorites]);
    return (
    <div>
        
            {
                isFav ? (
                    <button className={style.favButton} onClick={()=>handleAddFavorite(id)}>❤️</button>
                    ) : (
                        <button className={style.favButton} onClick={()=>handleAddFavorite(id)}>♡</button>
                        )
                    }
        <NavLink to={`/detail/${id}`} className={style.navlink}>
            <div className={style.container}>
                <div>
                    <img src={flag} alt={name}/>
                    <p>{name}</p>
                </div>
                <p>{continent}</p>
            </div>
        </NavLink>
    </div>
    )
}

export default Card;