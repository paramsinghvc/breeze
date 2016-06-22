import fetch from 'isomorphic-fetch';
import AppConstants from '../constants';
import Config from '../config';
import axios from 'axios';

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
    let prefixUri = `${Config.API_URI}/locations/v1/cities/geoposition/search`;
    let qs = [`apikey=${Config.API_KEY}`, `q=${lat},${long}`].join('&');

    return fetch(`${prefixUri}?${qs}`, {
        "mode": "no-cors"
    })
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

                        return $.ajax({
                                "async": true,
                                "crossDomain": true,
                                "url": "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=tGjzumuASY9ysnQ87brn3gJWTXNRXbGu&q=12.9323018%2C77.60757319999999",
                                "method": "GET"
                            })
                            .done((res) => {
                                console.log(res)
                                dispatch(setLocationName(res.EnglishName));
                                dispatch(ajaxEnd())
                            }).catch((err) => {
                                console.log(err)
                                dispatch(ajaxEnd())
                            })

                        }, ({ code }) => {
                            let message = '';
                            switch (code) {
                                case code.PERMISSION_DENIED:
                                    message = "You denied the request for Geolocation."
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

                return fetch(`${API_URI}?lat=${lat}&lon=${long}&APPID=${APP_ID}`, {
                        mode: 'no-cors'
                    })
                    .then(res => res.json())
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
