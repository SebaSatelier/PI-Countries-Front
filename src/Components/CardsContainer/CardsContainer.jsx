import Card from '../Card/Card'
import style from './CardsContainer.module.css'


const CardsContainer = ({viewCountries}) => {

    return (
        <div className={style.container}>
            {viewCountries?.map(country => {
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