import fetch from 'isomorphic-fetch';
import AppConstants from '../constants';

const API_URI = 'http://api.openweathermap.org/data/2.5/weather';
const APP_ID = '419e6668f09c47c54b9e547d78a15eef';
const PLACES_API_KEY = 'AIzaSyBiad0BKYHjoLLCj5FDxhuUrWdyLA2SrS8';

// Action creators
export const ajaxStart = (entity) => {
    return {
        type: AppConstants.AJAX_START,
        entity
    }
}
export const ajaxEnd = () => {
    return {
        type: AppConstants.AJAX_END
    }
}
export const showToast = (message) => {
    return {
        type: AppConstants.SHOW_TOAST,
        message
    }
}

function reverseGeoCode({ lat, long }) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBiad0BKYHjoLLCj5FDxhuUrWdyLA2SrS8`)
        .then(res => res.json())
}

export const setLocationName = (name) => {
    return {
        type: AppConstants.SET_LOCATION_NAME,
        name
    }
}
export const fetchLocation = () => {
    return (dispatch) => {
        dispatch(ajaxStart())
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                dispatch(setLocation({ lat: coords.latitude, long: coords.longitude }))
                return reverseGeoCode({ lat: coords.latitude, long: coords.longitude })
                    .then((res) => {
                        dispatch(setLocationName(res.results[res.results.length - 3].formatted_address));
                        dispatch(ajaxEnd())
                    }).catch(() => {
                        dispatch(ajaxEnd())
                    })

            }, ({ code }) => {
                let message = '';
                switch (code) {
                    case code.PERMISSION_DENIED:
                        message = "User denied the request for Geolocation."
                        break;
                    case code.POSITION_UNAVAILABLE:
                        message = "Location information is unavailable."
                        break;
                    case code.TIMEOUT:
                        message = "The request to get user location timed out."
                        break;
                    case code.UNKNOWN_ERROR:
                        message = "An unknown error occurred."
                        break;
                }
                dispatch(showToast(message));
                dispatch(ajaxEnd())
            })
        }
    }
}

export const recieveWeather = (location, json) => {
    return {
        type: AppConstants.RECIEVE_WEATHER,
        location,
        json
    }
}
export const fetchWeather = ({ lat, long }) => {
    return (dispatch) => {
        dispatch(ajaxStart());

        return fetch(`${API_URI}?lat=${lat}&lon=${long}&APPID=${APP_ID}`)
            .then((res) => res.json())
            .then((json) => {
                dispatch(recieveWeather({ lat, long }, json))
                dispatch(ajaxEnd())
            })
            .catch((err) => { dispatch(ajaxEnd()) })
    }
}

export const setLocation = ({ lat, long }) => {
    return {
        type: AppConstants.SET_LOCATION,
        lat,
        long
    }
}
