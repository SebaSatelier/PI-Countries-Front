import { NavLink } from "react-router-dom";
import style from './Card.module.css';

const Card = ({id,name,flag,continent}) => {
    return (
        <NavLink to={`/detail/${id}`} className={style.navlink}>
            <div className={style.container}>
                <img src={flag}/>
                <p>{name}</p>
                <p>{continent}</p>
            </div>
        </NavLink>
    )
}

export default Card;