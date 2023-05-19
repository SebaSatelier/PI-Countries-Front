import Card from '../Card/Card'
import { useSelector } from 'react-redux';
import style from './CardsContainer.module.css'


const CardsContainer = () => {
    const {countries, currentPage} = useSelector(state => state)

    let firstCountry = (currentPage-1) * 10;
    let lastCountry = currentPage * 10;

    let viewCountries = countries.slice(firstCountry,lastCountry)

    return (
        <div className={style.container}>
            {viewCountries.map(country => {
                return <Card
                key={country.id}
                id={country.id}
                name={country.name}
                flag={country?.flag[1]}
                continent={country.continent}
                />

            })}
        </div>
    )
}

export default CardsContainer;