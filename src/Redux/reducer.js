import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME,
POST_ACTIVITY, GET_ACTIVITIES, DELETE_ACTIVITY, UPDATE_ACTIVITY, NEXT_PAGE,PREV_PAGE,
ORDER,FILTER_BY_ACTIVITY,FILTER_BY_CONTINENT, CLEAN_COUNTRIES, RESET_PAGE} from './action-types'


const initialState = {
    currentPage : 1,
    countries: [],
    filterCountries: [],
    allCountries: [],
    activities: [],
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
        case CLEAN_COUNTRIES:
            return {
                ...state,
                countries: [],
                allCountries: []
            };
        case POST_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        case DELETE_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            };
        case UPDATE_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            };
        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage +1
            };
        case PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage -1
            };
        case RESET_PAGE: 
            return{
                ...state,
                currentPage: 1
            }
        case ORDER:
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
            const copyAllCountries = [...state.allCountries]
            if(action.payload === "All"){
                return{
                    ...state,
                    countries: state.allCountries
                }
            }
            return{
                ...state,
                countries: copyAllCountries.filter(country => country.activities.some(activity => activity.name === action.payload))
            }
        case FILTER_BY_CONTINENT:
            const copyOfCountries = [...state.allCountries]
            if(action.payload === "All"){
                return{
                    ...state,
                    countries: state.allCountries
                }
            }
            return{
                ...state,
                countries: copyOfCountries.filter(country => country.continent === action.payload)
            }
        default:
            return { ...state }
    }
}

export default reducer;