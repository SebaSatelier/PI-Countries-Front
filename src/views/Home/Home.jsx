import { CardsContainer, OrderAndFilter, Paginated } from "../../Components";
import style from './Home.module.css'

const Home = () => {
    return (
        <div className={style.Home}>
            <OrderAndFilter />
            <CardsContainer/>
            <Paginated/>

        </div>
    )
}

export default Home;