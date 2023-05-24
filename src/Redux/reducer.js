import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, GET_ACTIVITIES, NEXT_PAGE,PREV_PAGE,
ORDER,FILTER_BY_ACTIVITY,FILTER_BY_CONTINENT, RESET_PAGE, USER_DATA, LOG_OUT,
GET_FAVORITES,ADD_FAV,REMOVE_FAV, RESET_FILTER} from './action-types'


const initialState = {
    currentFavPage: 1,
    currentHomePage : 1,
    userData:{},
    favorites: [],
    allFavorites: [],
    countries: [],
    allCountries: [],
    allActivities:[],
    activeFavActivityFilter: 'All',
    activeFavContFilter: 'All',
    activeActivityFilter: 'All',
    activeContinentFilter: 'All'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };
        case GET_ACTIVITIES:
            return{
                ...state,
                allActivities: action.payload
            }
        case LOG_OUT: //borra el estado global cuando se cierra sesion
            return {
                ...state,
                currentFavPage: 1,
                currentHomePage : 1,
                userData:{},
                favorites: [],
                allFavorites: [],
                countries: [],
                activeFavActivityFilter: 'All',
                activeFavContFilter: 'All',
                activeActivityFilter: 'All',
                activeContinentFilter: 'All',
                allCountries: [],
            };
        case NEXT_PAGE:
            if(action.payload === "/favorites"){
                return{
                    ...state,
                    currentFavPage: state.currentFavPage +1
                }
            }
            return {
                ...state,
                currentHomePage: state.currentHomePage +1
            };
        case PREV_PAGE:
            if(action.payload === "/favorites"){
                return{
                    ...state,
                    currentFavPage: state.currentFavPage -1
                }
            }
            return {
                ...state,
                currentHomePage: state.currentHomePage -1
            };
        case RESET_PAGE:
            if(action.payload === "/favorites"){
                return{
                    ...state,
                    currentFavPage: 1
                }
            }
            return{
                ...state,
                currentHomePage: 1
            }
        case ORDER:
            if(action.location === "/favorites"){
                const favCopy = [...state.favorites]
                if(action.payload !== "A" && action.payload !== "Z"){
                    return {
                        ...state,
                        favorites: favCopy.sort((a,b) => (action.payload === 'MIN')?
                        a.population-b.population
                        :b.population-a.population )
                    }
                }
                return{
                    ...state,
                    favorites: favCopy.sort((a,b) => (action.payload === 'A')? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
                };
            }
            const countriesCopy = [...state.countries]
            if(action.payload !== "A" && action.payload !== "Z"){
                return {
                    ...state,
                    countries: countriesCopy.sort((a,b) => (action.payload === 'MIN')?  a.population-b.population : b.population-a.population )
                }
            }
            return {
                ...state,
                countries: countriesCopy.sort((a,b) => (action.payload === 'A')? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
            };

        case FILTER_BY_ACTIVITY:
            if(action.location === "/favorites"){
                const copyAllFav = [...state.allFavorites]
                if(action.payload === "All"){
                    return{
                        ...state,
                        favorites: (state.activeFavContFilter !== "All")?
                                copyAllFav
                                .filter(country => country.continent === state.activeFavContFilter)
                                :copyAllFav,
                        activeFavActivityFilter: "All"
                    }
                }
                return{
                    ...state,
                    favorites: (state.activeFavContFilter !== "All")?
                                    copyAllFav
                                    .filter(country => country.continent === state.activeFavContFilter)
                                    .filter(country => country.activities?.some(activity => activity.name === action.payload))
                                    :copyAllFav.filter(country => country.activities?.some(activity => activity.name === action.payload)),
                    activeFavActivityFilter: action.payload
                }
            }
            const copyAllCountries = [...state.allCountries]
            if(action.payload === "All"){
                return{
                    ...state,
                    countries: (state.activeContinentFilter !== "All")?
                            copyAllCountries
                            .filter(country => country.continent === state.activeContinentFilter)
                            :copyAllCountries,
                    activeActivityFilter: "All"
                }
            }
            return{
                ...state,
                countries: (state.activeContinentFilter !== "All")?
                                copyAllCountries
                                .filter(country => country.continent === state.activeContinentFilter)
                                .filter(country => country.activities?.some(activity => activity.name === action.payload))
                                :copyAllCountries.filter(country => country.activities?.some(activity => activity.name === action.payload)),
                activeActivityFilter: action.payload
            }
        case FILTER_BY_CONTINENT:
            if(action.location === "/favorites"){
                const copyFavCountries = [...state.allFavorites]
                if(action.payload === "All"){
                    return{
                        ...state,
                        favorites: (state.activeFavActivityFilter !== "All")?
                                    copyFavCountries
                                    .filter(country => country.activities?.some(activity => activity.name === state.activeFavActivityFilter))
                                    :copyFavCountries,
                        activeFavContFilter: 'All'
                    }
                }
                return{
                    ...state,
                    favorites: (state.activeFavActivityFilter !== "All")?
                                copyFavCountries
                                .filter(country => country.activities?.some(activity => activity.name === state.activeFavActivityFilter))
                                .filter(country => country.continent === action.payload)
                                :copyFavCountries.filter(country => country.continent === action.payload),
                    activeFavContFilter: action.payload
                }
            }
            const copyOfCountries = [...state.allCountries]
            if(action.payload === "All"){
                return{
                    ...state,
                    countries: (state.activeActivityFilter !== "All")?
                                copyOfCountries
                                .filter(country => country.activities?.some(activity => activity.name === state.activeActivityFilter))
                                :copyOfCountries,
                    activeContinentFilter: 'All'
                }
            }
            return{
                ...state,
                countries: (state.activeActivityFilter !== "All")?
                            copyOfCountries
                            .filter(country => country.activities?.some(activity => activity.name === state.activeActivityFilter))
                            .filter(country => country.continent === action.payload)
                            :copyOfCountries.filter(country => country.continent === action.payload),
                activeContinentFilter: action.payload
            }
        case RESET_FILTER:{
            if(action.payload === "/favorites"){
                return {
                    ...state,
                    favorites: [...state.allFavorites],
                    activeFavActivityFilter: 'All',
                    activeFavContFilter: 'All'
                }
            }
            return{
                ...state,
                countries: [...state.allCountries],
                activeActivityFilter: 'All',
                activeContinentFilter: 'All'
            }
        }
        case USER_DATA:
            return{
                ...state,
                userData: action.payload
            }
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload,
                allFavorites: action.payload
            }
        case ADD_FAV:
            if(state.activeFavActivityFilter !== 'All' && state.activeFavContFilter !== "All"){
                return{
                    ...state,
                    favorites: action.payload?.filter(country => country.activities?.some(activity => activity.name === state.activeActivityFilter))
                            ?.filter(country => country.continent === state.activeFavContFilter),
                    allFavorites: action.payload
                }
            }
            if(state.activeFavActivityFilter !== "All"){
                return{
                    ...state,
                    favorites: action.payload?.filter(country => country.activities?.some(activity => activity.name === state.activeFavActivityFilter)),
                    allFavorites: action.payload
                }
            }
            if(state.activeFavContFilter !== "All"){
                return{
                    ...state,
                    favorites: action.payload?.filter(country => country.continent === state.activeFavContFilter),
                    allFavorites: action.payload
                }
            }
            return {
                ...state,
                favorites: action.payload,
                allFavorites: action.payload
            }
        case REMOVE_FAV:
            if(state.activeFavActivityFilter !== 'All' && state.activeFavContFilter !== "All"){
                return{
                    ...state,
                    favorites: action.payload?.filter(country => country.activities?.some(activity => activity.name === state.activeActivityFilter))
                            ?.filter(country => country.continent === state.activeFavContFilter),
                    allFavorites: action.payload
                }
            }
            if(state.activeFavActivityFilter !== "All"){
                return{
                    ...state,
                    favorites: action.payload?.filter(country => country.activities?.some(activity => activity.name === state.activeFavActivityFilter)),
                    allFavorites: action.payload
                }
            }
            if(state.activeFavContFilter !== "All"){
                return{
                    ...state,
                    favorites: action.payload?.filter(country => country.continent === state.activeFavContFilter),
                    allFavorites: action.payload
                }
            }
            return {
                ...state,
                favorites: action.payload,
                allFavorites: action.payload
            }
        default:
            return { ...state }
    }
}

export default reducer;