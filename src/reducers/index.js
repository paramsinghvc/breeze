import AppConstants from '../constants';
import { combineReducers } from 'redux';
import { pruneWeather } from '../utils';

const initState = {
    isLoading: false,
    currentLocation: { lat: 0, long: 0 },
    currentWeather: {},
    locations: []
}

function host(state = initState, action) {
    switch (action.type) {
        case AppConstants.AJAX_START:
            return {
                ...state,
                isLoading: true
            }
        case AppConstants.AJAX_END:
            return {
                ...state,
                isLoading: false
            }
        case AppConstants.SET_LOCATION:
            return {
                ...state,
                currentLocation: { lat: action.lat, long: action.long },
                locations: [...state.locations, { lat: action.lat, long: action.long }]
            }
        case AppConstants.RECIEVE_WEATHER:
            return {
                ...state,
                currentWeather: pruneWeather(action.json),
                locations: state.locations.map((loc) => {
                    return ((loc.lat === action.lat) && (loc.lat === action.lat)) ? {...loc, weather: pruneWeather(action.json) } : loc;
                })
            }
        case AppConstants.SET_LOCATION_NAME:

            return {
                ...state,
                currentLocation: {...state.currentLocation, name: action.name },
                locations: state.locations.map((loc) => {
                    return ((loc.lat === state.currentLocation.lat) && (loc.lat === state.currentLocation.lat)) ? {...loc, name: action.name } : loc;
                })
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    host
})

export default rootReducer;
